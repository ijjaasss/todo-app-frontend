import './css/homebody.css'
function HomeBody() {
  return (
    <div className='backgorundbody'>
      
      <picture className="homebackgroundimg" >
            <source srcSet="/img/1.jpg" media="(max-width: 600px)"/>
            <img src="/img/picutr.jpg" alt="" />
          </picture>
      <h1 className='textforintro'>Remember your tasks, accomplish your goals</h1>
    </div>
  )
}

export default HomeBody
