
function Nav({removeCompleted, toggleFilter, itemsLeft, items: itemsCount}) {
    return (
        <div className={itemsCount !== 0 ? "nav" : "hidden"}> 
        <div className="nav-item">{itemsLeft} item{itemsLeft !== 1 ? "s" : ""} left</div>
        <div className="nav-item__center">
          <div className="nav-item"
          onClick={() => toggleFilter('All')}
          >
              All
            </div>
          <div className="nav-item"
          onClick={() => toggleFilter('Active')}
          >
              Active
          </div>
          <div className="nav-item"
          onClick={()=>{toggleFilter('Completed')}}
          >
              Completed
              </div>
        </div> 
    <div className="nav-item"
    onClick={removeCompleted}
    >
        Clear completed
        </div>
    </div>
  )
}
export default Nav;