import './App.MenuItem.scss'

function MenuItem(props){
    return(
        <div className='MenuItem'>
            <p>{props.text}</p>
        </div>
    )
}

export default MenuItem;