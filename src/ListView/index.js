import React, {Component} from 'react';
import ListItem from './listItem';

class ListView extends Component {
    
    render(){
        return <ul className='grid-item palm-one-whole lap-two-thirds desk-two-thirds '>
          {
            this.props.properties.map(property=>
              <ListItem key={property.id} {...property}/>
            )
          }
        </ul>
    }
}

export default ListView;