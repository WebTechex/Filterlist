import React, { useState, useEffect } from 'react';
import './css/style.css';

const Getitems = () => {
    const real = localStorage.getItem('real');
    if (real) {
        return JSON.parse(localStorage.getItem('real'));
    } else {
        return [];
    }
}


const Main = () => {
    const [data, Set] = useState();
    const [item, Items] = useState(Getitems());
    const [toggle, Toggle] = useState(true);
    const [final, Final] = useState(null);

    const Input = (e) => {
        console.log(e.target.value);
        Set(e.target.value);
    }

    const Added = () => {
        if (!data) {
            alert('Plz Fill item');
        } else if (data && !toggle) {
            Items(
                item.map((val) => {
                    if (val.id === final) {
                        return { ...val, name: data }
                    }
                    return val;
                })
            )
            Toggle(true);
            Set('');
            Final(null);
        }

        else {
            const values = { id: new Date().getTime().toString(), name: data }
            Items([...item, values]);
            Set('');
        }
    }

    const Delete = (index) => {
        Items((prev) => {
            return prev.filter((val) => {
                return val.id !== index;
            })
        })
    }

    const Removeall = () => {
        Items([]);
    }

    useEffect(() => {
        localStorage.setItem('real', JSON.stringify(item));
    }, [item]);

    const Edit = (ind) => {
        const list = item.find((val) => {
            return val.id === ind;
        })
        console.log(list);
        Toggle(false);
        Set(list.name);
        Final(ind);
    }

    return (
        <div>
            <div className="main">
                <div className="list">
                    <img src="./pics/todo.svg" alt="no image" />
                    <p style={{ margin: '10px 0', color: 'white' }}>Add Your List Here ✌️ </p>
                    <div className="input">
                        <input type="text" placeholder='✍️ Add item..' onChange={Input} value={data} />
                        {toggle ?
                            <span className="add">
                                <i className="fa fa-plus" title='Add item' style={{ fontSize: '12px', cursor: 'pointer', marginLeft: '20px' }} onClick={Added}></i>
                            </span> :
                            <span className="add">
                                <i className="fa fa-edit" title='Update item' style={{ fontSize: '19px', cursor: 'pointer', marginLeft: '20px', color: 'rgb(78, 214, 151)' }} onClick={Added}></i>
                            </span>
                        }

                    </div>
                    <div className="display">
                        <ol>
                            {item.map((val) => {
                                return (
                                    <li key={val.id}>{val.name}
                                        <div> <i className="fa fa-edit" aria-hidden="true" title='Edit item' style={{ cursor: 'pointer' }} onClick={() => { Edit(val.id) }}></i>
                                            <i className="fa fa-trash" aria-hidden="true" title='Remove item' style={{ cursor: 'pointer' }} onClick={() => { Delete(val.id) }}></i></div>
                                    </li>
                                )
                            })}

                        </ol>
                    </div>
                    <button className="update" onClick={Removeall}>REMOVE ALL</button>
                </div>
            </div>
        </div>
    );
}

export default Main;

