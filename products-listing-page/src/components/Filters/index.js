import './index.css'

const CategoryItem = props => {
  const {tabDetails, filterCategory, isActive} = props
  const {tabId, displayText} = tabDetails

  const onClickOfCategory = () => {
    filterCategory(tabId)
    
  }
  const appClass = isActive ? 'active' : 'category-button'

  return (
    <li className="category-items">
      <button className={appClass} type="button" onClick={onClickOfCategory}>
        {displayText}
      </button>
    </li>
  )
}

export default CategoryItem