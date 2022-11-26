import React from 'react';
import Asset from './Asset';

export default function AssetsList( { assets, deleteAsset } ) {
  return (
    assets.map(asset => {
        return <Asset key={asset.id} asset={asset} deleteAsset={deleteAsset} />
    })
  )
}