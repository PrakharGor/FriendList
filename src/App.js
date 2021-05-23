import React, {useState, useEffect} from 'react'
import './App.css';

let friendData = [
    {
        id: 1,
        name: 'Rohit Sharma',
        isFavourite: false
    },
    {
        id: 2,
        name: 'Shikhar Dhawan',
        isFavourite: true
    },
    {
        id: 3,
        name: 'Virat Kohli',
        isFavourite: false
    },
    {
        id: 4,
        name: 'Shreyas Iyer',
        isFavourite: true
    }, {
        id: 5,
        name: 'Rishabh Pant',
        isFavourite: false
    }, {
        id: 6,
        name: 'Hardik Pandya',
        isFavourite: false
    },
]
function App() {
    const [FriendListData, setFriendListData] = useState(friendData);
    const [filterFlag, setFiletrFlag] = useState(false);
    const [filterListData, setFilterListData] = useState([]);
    const setFavourite = id => {
        let currObj = FriendListData.filter((item) => item.id == id);
        currObj[0].isFavourite = ! currObj[0].isFavourite;
        setFriendListData([...FriendListData]);
    }
    const deleteFriend = id => {
        var removeIndex = FriendListData.map(function (item) {
            return item.id;
        }).indexOf(id);
        FriendListData.splice(removeIndex, 1);
        setFriendListData([...FriendListData]);
    }

    const setFilterData = name => {
        if (name != '') {
            name = name.toLocaleLowerCase();
            let currObj = FriendListData.filter((item) => item.name.toLocaleLowerCase().indexOf(name) > -1);
            // if (currObj && currObj.length > 0) {
            setFilterListData(currObj)
            setFiletrFlag(true)
            // }
        } else {
            setFiletrFlag(false)
        }
    }

    const addFriends = val => {
        let newFriend = {
            id: FriendListData.length + '_' + new Date(),
            name: val,
            isFavourite: false
        }
        setFriendListData([
            ...FriendListData,
            newFriend
        ])
        console.log(val)
    }
    useEffect(() => {}, [FriendListData])
    return (
        <div>
            <div className='container'><AddPanel addFriends={
                    (val) => addFriends(val)
                }/></div>
            <div className='container'>

                <div className='panelTitle'>Friends List</div>
                <SearchPanel setFilterData={
                    (value) => setFilterData(value)
                }/>
                <FriendList FriendListData={
                        filterFlag ? filterListData : FriendListData
                    }
                    setFavourite={
                        (id) => setFavourite(id)
                    }
                    deleteFriend={
                        (id) => deleteFriend(id)
                    }/>
            </div>
        </div>
    );
}


function SearchPanel({setFilterData}) {

    return (
        <div className='inputPanel'>
            <input type='text' placeholder='Search here...'
                onChange={
                    (e) => setFilterData(e.target.value)
                }/>
        </div>
    )
}

function AddPanel({addFriends}) {

    return (
        <div className='inputPanel'>
            <input type='text' placeholder='Add Friend...'
                onKeyPress={
                    (e) => {

                        var code = (e.keyCode ? e.keyCode : e.which);
                        if (code == 13 && e.target.value != '') {
                            addFriends(e.target.value)
                            e.target.value = ''
                        }
                    }
                }/>
        </div>
    )
}

function FriendList({FriendListData, setFavourite, deleteFriend}) {

    let favFriends = FriendListData.filter((item) => item.isFavourite == true)
    let normalFriends = FriendListData.filter((item) => item.isFavourite != true)
    return (
        <ul className='friendList'>
            {
            favFriends.map((item) => {
                return <FriendLIstSingle item={item}
                    setFavourite={
                        (id) => setFavourite(id)
                    }
                    deleteFriend={
                        (id) => {
                            deleteFriend(id)
                        }
                    }/>

            })
        }
            {
            normalFriends.map((item) => {
                return <FriendLIstSingle item={item}
                    setFavourite={
                        (id) => setFavourite(id)
                    }
                    deleteFriend={
                        (id) => {
                            deleteFriend(id)
                        }
                    }/>

            })
        } </ul>
    )
}

function FriendLIstSingle({item, setFavourite, deleteFriend}) {
    return (
        <li>
            <div className='friendLabel'>
                {
                item.name
            } </div>
            <ActionPanel isFavourite={
                    item.isFavourite
                }
                id={
                    item.id
                }
                setFavourite={
                    () => setFavourite(item.id)
                }
                deleteFriend={
                    () => deleteFriend(item.id)
                }/>
        </li>
    )

}
function ActionPanel({isFavourite, id, setFavourite, deleteFriend}) {
    let favClass = isFavourite ? '' : '-o';
    return (
        <div className='actionPanel'>
            <span className={
                    'fa starIcon fa-star' + favClass
                }
                onClick={
                    () => setFavourite()
            }></span>
            <span className='fa fa-trash-o deleteIcon'
                onClick={
                    () => deleteFriend()
            }></span>
        </div>
    )
}
export default App;
