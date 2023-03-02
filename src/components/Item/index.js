import './index.css'

const Item = props => {
  const {details, onGame} = props
  const {imageUrl, id} = details

  const getId = () => {
    onGame(id)
  }
  console.log(`${id.toLowerCase()}Button`)
  return (
    <button
      type="button"
      className="game-button"
      data-testid={`${id.toLowerCase()}Button`}
      onClick={getId}
    >
      <img src={imageUrl} className="img" alt={id} />
    </button>
  )
}

export default Item
