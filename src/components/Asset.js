import React from 'react';

export default function Asset( { asset, deleteAsset } ) {

    function handleDelete() {
        deleteAsset(asset.id);
    }

    return (
        <div className="asset">
            <div className='asset__mainInfo'>
                <div className='asset__mainInfo--name'><span className='asset__symbol'>{asset.symbol}</span></div>
                <div className='asset__mainInfo--amount'>${asset.amount}</div>
            </div>
            <div className="asset__x" onClick={handleDelete}>&times;</div>
            <div className="asset__date">As of: {asset.date} </div>
        </div>
    )
}
