import todoSlice, { loadTodo, addTodo,deleteTodo, deleteCompleted,setComplAll,toggleTodo, changeTodo } from '../store/createSlice';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const initialState = {
    items: []
}
describe('tests actions', () => {

    it('should  getting initail state', () => {
        expect(todoSlice(undefined, {})).toEqual(initialState);
    });
 
    it('should load database', async () => {
        const mockReq = jest.spyOn(axios, 'get');
        const mockResponse = [{
            _id: 1,
            task: 'text1',
            complete: false,
            __v: 0,
        }, 
        {
            _id: 2,
            task: 'text2',
            complete: false,
            __v: 0,
        },
      ];
      mockReq.mockImplementation(() =>
      Promise.resolve({ data: mockResponse })
    );
      const store = mockStore({items: []})
      const response = await store.dispatch(loadTodo());
      const state = todoSlice(store.getState(), {
          type: response.type,
          payload: response.payload,
      });
        expect(response.type).toEqual('todos/loadTodo/fulfilled');
        expect(response.payload.length).toBe(2);
        expect(state.items).toEqual(mockResponse);
    });

    it('should  add task', async () => {
        const mockReq = jest.spyOn(axios, 'post');
        const mockResponse = {
            _id: 123,
            task: 'Some text',
            complete: false,
            __v: 0,
          };
        const store = mockStore({
            items: [
            {
                _id: 111,
                task: 'Text',
                complete: false,
                __v: 0,
        },
        ]
    });
        mockReq.mockImplementation(() => Promise.resolve({ data: mockResponse }));
        const response = await store.dispatch(addTodo('Some text'));
        const state = todoSlice(store.getState(), {
            type: response.type,
            payload: response.payload,
        });
        expect(response.type).toBe('todos/addTodo/fulfilled');
        expect(state.items.length).toEqual(2);
        expect(state.items[state.items.length - 1]).toEqual(mockResponse);
    });
//-------------------------------------------------------------------------------
//     it('should be update text in task', async () => {
//         const mockReq = jest.spyOn(axios, 'put');
//         const change = { _id: 1, text: "Bebebe" };
//         const mockResponse = {
//             _id: 1,
//             task: 'Some text',
//             complete: false,
//             __v: 0,
//         };
//         mockReq.mockImplementation(() => Promise.resolve(mockResponse ));
//         const store = mockStore({ items: [mockResponse], });
//         const response = await store.dispatch(changeTodo(change));
        
//         const state = todoSlice(store.getState(), {
//             type: response.type,
//             payload: response.payload,
//           });
//           console.log(response)
//         const newStore = store.getState();
//         newStore.items[0].task = change.text;
//         console.log('[0]', newStore.items[0].task);
//         expect(response.type).toBe('todos/changeTodo/fulfilled');
//         console.log(state);
//         expect(state.items[0].task).toEqual(change.text);
//     });
// //---------------------------------------------------------------
//     it('should update check status', async () => {
//         const mockReq = jest.spyOn(axios, 'put');
//         const completed = {_id: 1, complete: true};
//         const mockResponse = {
//             _id: 1,
//             task: 'Some text',
//             complete: false,
//             __v: 0,
//         };
//         mockReq.mockImplementation(() => Promise.resolve(mockResponse));
//         const store = mockStore({
//             items: [{
//               _id: 1,
//             task: 'Some text',
//             complete: false,
//             __v: 0,  
//             }]
//         });
//         const response = await store.dispatch(toggleTodo(completed));
//         const state = todoSlice(store.getState(), {
//             type: response.type,
//             payload: completed,
//           });
//           //console.log(response)
//           expect(response.type).toEqual('todos/toggleTodo/fulfilled');
//           expect(state.items[0].complete).toBe(true);

//     });
//---------------------------------------------------------
    it('should delete task', async () => {
        const mockReq = jest.spyOn(axios, 'delete');
        const mockResponse = {
            _id: 1,
            task: 'Some text',
            complete: false,
            __v: 0,
        };
        mockReq.mockImplementation(() => Promise.resolve(mockResponse));
        const store = mockStore({
            items: [{
              _id: 1,
            task: 'Some text',
            complete: false,
            __v: 0,  
            }]
        });
        const response = await store.dispatch(deleteTodo(1));
        const state = todoSlice(store.getState(), {
            type: response.type,
            payload: response.payload,
          });
          expect(response.type).toEqual('todos/deleteTodo/fulfilled');
          expect(state).toEqual({ items: [] });
    });

    it('should  delete completed tasks', async () => {
        const mockReq = jest.spyOn(axios, 'delete');
        mockReq.mockImplementation(() => Promise.resolve());
        const store = mockStore({
            items: [
              {
                _id: 1,
                task: 'Some text',
                complete: true,
                __v: 0,
              },
              {
                _id: 2,
                task: 'Some text2',
                complete: false,
                __v: 0,
              },
              {
                _id: 3,
                task: 'Some text3',
                complete: true,
                __v: 0,
              },
              {
                _id: 4,
                task: 'Some text4',
                complete: false,
                __v: 0,
              },
            ],
          });
          const response = await store.dispatch(deleteCompleted());
          const state = todoSlice(store.getState(), {
            type: response.type,
          });
          expect(response.type).toEqual('todos/deleteCompleted/fulfilled');
          expect(state.items.length).toBe(2);
          expect(state).toEqual({
              items: [
                {
                    _id: 2,
                    task: 'Some text2',
                    complete: false,
                    __v: 0,
                },
                {
                    _id: 4,
                    task: 'Some text4',
                    complete: false,
                    __v: 0,
                },
              ]
          });
    });

    it('should trying to set all tasks completed', async () => {
        const mockReq = jest.spyOn(axios, 'put');
        const completed = {complete: true};
        mockReq.mockImplementation(() => Promise.resolve());
        const store = mockStore({
            items: [
              {
                _id: 1,
                task: 'Some text',
                complete: true,
                __v: 0,
              },
              {
                _id: 2,
                task: 'Some text2',
                complete: false,
                __v: 0,
              },
            ],
          });
        const response = await store.dispatch(setComplAll(completed));
    const state = todoSlice(store.getState(), {
        type: response.type,
        payload: completed,
      });
      expect(response.type).toBe('todos/setComplAll/fulfilled');
      state.items.map((todo) => expect(todo.complete).toBe(true));
    });
   
});

describe('testing errors', () => {
    it('Should throw an Error during getting all todos', async () => {
        const mockGet = jest.spyOn(axios, 'get');
        mockGet.mockImplementation(() =>
          Promise.reject([
            {
              _id: '123',
              task: 'Some Text',
              complete: false,
              __v: 0,
            },
          ])
        );
        const store = mockStore({ items: [] });
        const response = await store.dispatch(loadTodo());
        const state = todoSlice(store.getState(), {
          type: response.type,
          payload: response.payload,
        });
        expect(store.getState()).toEqual(state);
        expect(response.type).toBe("todos/loadTodo/rejected");
        expect(response.error.message).toBe('🤔 Server error, cannot get tasks');
      });

      it('Should throw an Error during add new todo', async () => {
        const mockGet = jest.spyOn(axios, 'post');
        mockGet.mockImplementation(() =>
          Promise.reject({
            _id: '123',
            task: 'Some Text',
            complete: false,
            __v: 0,
          })
        );
        const store = mockStore({ items: [] });
        const response = await store.dispatch(addTodo('Some Text'));
        const state = todoSlice(store.getState(), {
          type: response.type,
          payload: response.payload,
        });
        expect(store.getState()).toEqual(state);
        expect(response.type).toBe("todos/addTodo/rejected");
        expect(response.error.message).toBe('🤔 Server error, can not add new task');
      });

      it('Should throw an Error during deleting todo', async () => {
        const mockGet = jest.spyOn(axios, 'delete');
        mockGet.mockImplementation(() => Promise.reject({}));
        const store = mockStore({
          todoItems: [
            {
              _id: '123',
              task: 'Some Text',
              complete: false,
              __v: 0,
            },
          ],
        });
        const response = await store.dispatch(deleteTodo('123'));
        const state = todoSlice(store.getState(), {
          type: response.type,
          payload: response.payload,
        });
        expect(store.getState()).toEqual(state);
        expect(response.type).toBe("todos/deleteTodo/rejected");
        expect(response.error.message).toBe('🤔 Server error, can not delete task');
      });

      it('Should throw an Error during updating todo', async () => {
        const mockGet = jest.spyOn(axios, 'put');
        const change = { id: 'ID_123', changes: { text: 'Hohoho' } };
        const responseObject = {
          _id: 'ID_123',
          task: 'Some Text',
          complete: false,
          __v: 0,
        };
        mockGet.mockImplementation(() => Promise.reject(responseObject));
        const store = mockStore({ items: [responseObject] });
        const response = await store.dispatch(changeTodo(change));
        const state = todoSlice(store.getState(), {
          type: response.type,
          payload: response.payload,
        });
        expect(store.getState()).toEqual(state);
        expect(response.type).toBe("todos/changeTodo/rejected");
        expect(response.error.message).toBe('🤔 Server error, can not update task');
      });

      it('Should throw an Error during changing all tasks completed', async () => {
        const mockGet = jest.spyOn(axios, 'put');
        const changeOn = true;
        mockGet.mockImplementation(() => Promise.reject());
        const store = mockStore({
          items: [
            {
              _id: 'ID_123',
              task: 'Some Text',
              complete: false,
              __v: 0,
            },
            {
              _id: 'ID_321',
              task: "S asdfdsa",
              complete: true,
              __v: 0,
            },
          ],
        });
        const response = await store.dispatch(setComplAll(changeOn));
        const state = todoSlice(store.getState(), {
          type: response.type,
          payload: response.payload,
        });
        expect(store.getState()).toEqual(state);
        expect(response.type).toBe("todos/setComplAll/rejected");
        expect(response.error.message).toBe('🤔Server error, can not change tasks');
      });

      it('Should throw an Error during deleting all complited tasks', async () => {
        const mockGet = jest.spyOn(axios, 'delete');
        mockGet.mockImplementation(() => Promise.reject());
        const store = mockStore({
          todoItems: [
            {
              _id: 'ID_321',
              task: 'S asdfdsa',
              complete: true,
              __v: 0,
            },
            {
              _id: 'ID_123',
              task: 'Some Text',
              complete: false,
              __v: 0,
            },
            {
              _id: 'ID_21_rf3',
              task: 'Some Text',
              complete: false,
              __v: 0,
            },
            {
              _id: 'ID_sdafsa1',
              task: 'S asdfdsa',
              complete: true,
              __v: 0,
            },
          ],
        });
        const response = await store.dispatch(deleteCompleted());
        const state = todoSlice(store.getState(), {
          type: response.type,
          payload: response.payload,
        });
        expect(store.getState()).toEqual(state);
        expect(response.type).toBe('todos/deleteCompleted/rejected');
        expect(response.error.message).toBe('🤔 Server error, can not delete tasks');
      });
});