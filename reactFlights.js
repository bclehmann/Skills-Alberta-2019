

class Flights extends React.Component {
	constructor(props) {
		super(props);
		
		this.state={flightData:""};
		
		this.getData=this.getData.bind(this);
		this.getData();
	}

	getData(){
		var that=this;
		jQuery.post("/Content/Data/LocationsData2019.txt", "", function(data) {
			that.setState({flightData:data});
		}, "text");
	}
	
	render() {
		return <NextFlights flightData={this.state.flightData}/>;
	}
}

class NextFlights extends React.Component {
	constructor(props) {
		super(props);
		
		this.state={keyword:""};
		
		this.parseData=this.parseData.bind(this);
		this.handleChange=this.handleChange.bind(this);
		
	}
	
	handleChange(e){
		//console.log(e.target.value);
		this.setState({keyword:e.target.value});
	}
	
	parseData(callback){
		var raw=this.props.flightData
		
		var rawByLine=raw.split("\n");
		
		var objArr=new Array();
		
		rawByLine.forEach(function(item, i) {
			if(i>0){//nuke first line
				var lnArr=item.split(",");
				var obj={
					from:lnArr[0],
					to:lnArr[1],
					depart:new Date(lnArr[2]),
					land:new Date(lnArr[3]),
					flightTime: lnArr[4],
					ontime:lnArr[5]
				}
				
				objArr.push(obj)
				
			}
		});
		
		return objArr;
		
	}

	render() {
		return (<span><SearchBar value={this.state.keyword} handleChange={this.handleChange} data={this.parseData()}/><Table keyword={this.state.keyword} data={this.parseData()} /></span>) ;
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <span><br/><input type="text" className="flightSearch" placeholder="Search Term Here" onChange={this.props.handleChange}/></span>;
	}
}


class Table extends React.Component {
	constructor(props) {
		super(props);
		
		this.selectData=this.selectData.bind(this);
	}
	
	selectData(keyword, data){
		var output=new Array();
		keyword=keyword.toUpperCase();
		
		var regex=/[\s]/gi;
		
		keyword=keyword.replace(regex, "_");//Space to underscore
		
		//console.log(keyword);
		data.forEach(function(item, i) {
			if(item.from.toUpperCase().includes(keyword) || item.to.toUpperCase().includes(keyword)){
				output.push(item);
			}
		});
		
		return output;
	}
	
	
	render() {
		
		
		var i=0;
		var output=this.selectData(this.props.keyword, this.props.data).slice(0,10).map(function(item){
			return <TableEl data={item} key={i++}/>
		});
		
		return <span className="reactTable">{output}</span>;
	}
}

class TableEl extends React.Component {
	constructor(props) {
		super(props);
		
		this.late=this.late.bind(this);
	}
	

	late(){
		if(this.props.data.ontime.trim()==="True"){
			return <span className="green"> ON TIME</span>
		}else{
			return <span className="red"> LATE</span>
		}
	}
	
	render() {
		return (<span>
					<h4>To <b>{this.props.data.to.replace(/_/gi, " ")}</b> from <b>{this.props.data.from.replace(/_/gi, " ")}</b></h4><br />
					<span className="tab"></span>Arriving <i>{this.props.data.land.toLocaleString()}</i> <b>{this.late()}</b><br/>
				</span>)
	}
}

$(document).ready(function(){
	var el=document.getElementById("reactFlight");
	ReactDOM.render(<Flights />, el);
});