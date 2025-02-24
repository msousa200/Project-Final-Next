import React from 'react'



type Props = {
    data: {
        title: string,
        description: string,
        button: string,
}
}


export const Card: React.FC<Props> = ({data}) => {
    return (
        <div style={style description}>{data.description}</div>
        <button>{data.button</button>}
        </div>
    );
};

const style = {
    card: {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
}

    title: {
        fontSize: '18px',
        fontWeight: 'bold',
}

    description: {
        fontSize: '16px',
}


}