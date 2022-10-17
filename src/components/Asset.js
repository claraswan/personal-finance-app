import React from 'react';

export default function Asset( { asset, deleteAsset } ) {

    

    function handleDelete() {
        deleteAsset(asset.id);
    }

    return (
        <div className="asset">
            <div className='asset__name'>{asset.symbol}</div>
            <div className='asset__amount'>${asset.amount}</div>
            <div className="asset__x" onClick={handleDelete}>&times;</div>
        </div>
    )
}
