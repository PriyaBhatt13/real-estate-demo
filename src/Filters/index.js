import React, {Component} from 'react';

class Filters extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFilters: []
        }
        this.selectFilter = this.selectFilter.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    selectFilter(e) {
        e.preventDefault();
        const value = e.currentTarget.value;
        let selectedFilters = this.state.selectedFilters;
        const index = selectedFilters.indexOf(value);
        if(index === -1 ){
            selectedFilters.push(value);
        }
        else{
            
            selectedFilters.splice(index, 1);
        }
        this.setState({
            selectedFilters
        });
    }

    applyFilter = () => {
        this.props.onClick(this.state.selectedFilters);
    }

    resetFilter = (e) => {
        e.preventDefault();
        const selectedFilters = [];
        this.setState({
            selectedFilters
        });
        this.props.onClick(selectedFilters);
    }

    filtersMarkup = () => {
        const {availableFilters} = this.props;
        return Object.keys(availableFilters).map((key,index) =>{
            return (
                <div key={index} className='inline-block'>
                    <span className='block font-m font-bold font-info font-capitalized'>{key}</span>
                    {availableFilters[key].map((filter,index)=>{
                        return <button  className={`margin-s font-capitalized ${this.state.selectedFilters.includes(filter) ? 'button-secondary' : 'button'}`}  onClick={this.selectFilter} value={filter}>{filter}</button>
                    })}
                </div>
            );
        })
    }
    
    render(){
        if(this.props.showFilter){
            return <div className='background-white'>
                {this.filtersMarkup()}
                <a href="#" className="link-underline align-baseline" onClick={this.resetFilter}>Reset Filters</a>
                <button className='button-primary margin-s' onClick={this.applyFilter} value='apply filter'>Apply Filter</button>
            </div>
        }
        else {
            return null;
        }
        
        
    }
}

export default Filters;