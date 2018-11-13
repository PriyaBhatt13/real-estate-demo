import React from 'react';

const ListItem = (data)=>{
    const {addressToDisplay,floorSpace,pictureUrl,priceForTotalArea,realtorCompanyName,title,realtorName,productType} = data;
    return (
        <li className={`border padding shadow background-white margin-s grid grid-flex grid-fill-rows absolute-reference  ${productType === 'L' ? 'border-info background-warning' : 'border'}`}>            
            {productType === 'L' && <span className='fa fa-certificate absolute-content top'></span>}
            <img src={pictureUrl} alt={title} className='one-third palm-one-whole grid-item'/>
            <div className='card-details grid-item two-thirds palm-one-whole lap-two-thirds desk-two-thirds padding-left'>
                
                <p className='font-brandorange font-uppercase font-bold'>{title}</p>
                <p><span className='fa fa-user-alt'></span><span className='font-info font-italic'> By {`${realtorCompanyName} (${realtorName})`}</span></p>
                <p><span className='fa fa-map-marker-alt'></span>{addressToDisplay}</p>
                <p><span className='fa fa-euro-sign'></span>{priceForTotalArea}</p>                
                <p><span className='fa fa-home'></span>{floorSpace}</p>           
            </div>
        </li>
    )
    
}
export default ListItem;