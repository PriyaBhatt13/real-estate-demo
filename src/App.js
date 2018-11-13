import React, { Component } from 'react';
import './App.css';
import Piechart from './PieChart';
import ListViw from './ListView';
import Filters from './Filters';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      properties:[],
      isLoading: false,
      error: null,
      geoName: ''
    };
    this.filterProperties = this.filterProperties.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.availableFilters = [];;
  }

  componentDidMount(){
    this.setState({ isLoading: true });
    fetch(`${window.location.origin}/data/serverResponse.json`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(data => {
      this.setState({ 
        properties: this.updateData(data.resultlistEntries),
        isLoading: false, 
        geoName: data.geoName,
      })
      this.availableFilters = this.createFiltersData(data.resultlistEntries);
      this.nonFilteredData = this.updateData(data.resultlistEntries);
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }
  /*Properties with "productType" as "L" should be displayed first in the list*/
  compareProductType = (a,b) => {
    if (a.productType < b.productType)
      return -1;
    if (a.productType > b.productType)
      return 1;
    return 0;
  }
  /*SortBy function*/
  sortByProductType = (properties) =>{
    return properties.sort(this.compareProductType);
  }
  /*Since data does not contain postal Code seperately following function extracts
    postal code out of "addressToDisplay" field and adds a new field in data*/
  updateData = (properties) => {
    const sortedData = this.sortByProductType(properties);
    const propertiesWithPostalCode =  sortedData.map((property) => {
      var o = Object.assign({}, property);
      o.postalCode = property.addressToDisplay.match(/\b\d{5}\b/g)[0];
      return o;
    });
    return propertiesWithPostalCode;
  }

  /*group by data with postal code*/
  groupByPostalCode = () => {
    const result = this.state.properties.reduce((property, a) => {
      property[a.postalCode.substring(0,2)] = property[a.postalCode.substring(0,2)] || [];
      property[a.postalCode.substring(0,2)].push(a);
      return property;
    }, Object.create(null));
    return result;

  }

  /*generate dataset for filters with "features" & "commercializationType"*/
  createFiltersData = (properties) => {
    
    let features = [],
      types= [];

    properties.forEach(entry=>{
      features = features.concat(entry.features);
      types.push(entry.commercializationType);
    });
    features = features.filter((value,index) =>features.indexOf(value) === index)
    types = types.filter((value,index) => types.indexOf(value) === index)
    return { 'features':features, 'commercializationType': types } 
  }

  /*filter properties based on filters applied by user*/
  filterProperties = (selectedFilters) => {
    let properties = this.state.properties;
    
    if(selectedFilters.length > 0 ){
      properties = properties.filter((d)=>{
        return selectedFilters.every(elem => d.features.indexOf(elem) > -1);
      });
    }
    else {
      properties = this.nonFilteredData;
    }
    
    properties = this.sortByProductType(properties);
  
    this.setState({
      properties,
      showFilter: !this.state.showFilter
    });

  }

  /* function to display filters overlay */
  toggleFilter = (e) =>{
    e.preventDefault();
    this.setState({
      showFilter: !this.state.showFilter
    });
  }

  generatePieChartData = () => {
    const group = this.groupByPostalCode();
    const pieChartData = Object.keys(group).map((value)=>{
      let o = {};
      o.value = group[value].length;
      o.label = `${value}***(${group[value].length})`;
      return o;
    });
    return pieChartData;
  }

  render() {
    const {isLoading,error} = this.state;
    const pieChartData = this.generatePieChartData();

    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }
   
    return (
      <div className="viewport">
        <div className="page-wrapper">
          <div className="content-wrapper background">
            <h1 className='align-center'>{this.state.geoName}</h1>
            
            <button className='button-secondary' value={this.state.showFilter} onClick={this.toggleFilter} >More filters</button>
            
            <Filters availableFilters={this.availableFilters} onClick={this.filterProperties} showFilter={this.state.showFilter}/>
            <div className='grid grid-flex'>
              <ListViw  properties={this.state.properties}/>
              <div className='grid-item lap-one-third desk-one-third palm-one-whole palm-order-one-up lap-order-one-down desk-order-one-down'>
                <svg width="400" height="300">
                  <Piechart x={100} y={100} outerRadius={100} innerRadius={50}
                    data={pieChartData}/>
                </svg>
              </div>
              
            </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
