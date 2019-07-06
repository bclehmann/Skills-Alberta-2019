

class Flights extends React.Component {
	constructor(props) {
		super(props);
		
		var dateObj=new Date();
		var formattedDateStr=(dateObj.getFullYear()+"-"+(""+(dateObj.getMonth()+1)).padStart(2, "0")+"-"+(""+dateObj.getDate()).padStart(2, "0"));
		
		this.state={flightData:"", keywordTo:"", keywordFrom:"", keywordDate:formattedDateStr};
		
		
		this.getData=this.getData.bind(this);
		this.parseData=this.parseData.bind(this);
		
		this.handleChangeTo=this.handleChangeTo.bind(this);
		this.handleChangeFrom=this.handleChangeFrom.bind(this);
		this.handleChangeDate=this.handleChangeDate.bind(this);
		this.selectData=this.selectData.bind(this);
		this.getData();
	}

	handleChangeTo(e){
		this.setState({keywordTo:e.target.value});
	}
	
	handleChangeFrom(e){
		this.setState({keywordFrom:e.target.value});
	}
	
	handleChangeDate(e){
		this.setState({keywordDate:e.target.value});
	}
	
	selectData(keywordTo, keywordFrom, keywordDate, data){
		var output=new Array();
		keywordTo=keywordTo.toUpperCase();
		keywordFrom=keywordFrom.toUpperCase();
		var keywordDateObj=new Date(keywordDate);
		
		var regex=/[\s]/gi;
		
		keywordTo=keywordTo.replace(regex, "_");//Space to underscore
		keywordFrom=keywordFrom.replace(regex, "_");//Space to underscore
		
		//console.log(keyword);
		data.forEach(function(item, i) {
			if(item.from.toUpperCase().includes(keywordFrom) && item.to.toUpperCase().includes(keywordTo)){
				if(item.land.valueOf()>=keywordDateObj.valueOf()){
					output.push(item);
				}
			}
		});
		
		return output;
	}
	
	getData(){
		var that=this;
		jQuery.post("/returnLocationData.php", "", function(data) {
			that.setState({flightData:data});
		}, "text");
	}
	
	parseData(){
		var raw=this.state.flightData;
		
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
					ontime:lnArr[5],
					id:i
				}
				
				objArr.push(obj)
			}
		});
		
		return objArr;
		
	}
	
	render() {
		return (<span><SearchBar valueDate={this.state.keywordDate} valueTo={this.state.keywordTo} valueFrom={this.state.keywordFrom} handleChangeDate={this.handleChangeDate} handleChangeTo={this.handleChangeTo} handleChangeFrom={this.handleChangeFrom} data={this.props.flightData}/><NextFlights flightData={this.selectData(this.state.keywordTo, this.state.keywordFrom, this.state.keywordDate, this.parseData(this.state.flightData))}/></span>);
	}
}

class NextFlights extends React.Component {
	constructor(props) {
		super(props);
		
		
		this.columnize=this.columnize.bind(this);
	}
	
	
	
	columnize(){
		var data=this.props.flightData;
		var columnized=new Array();
		
		data.forEach(function(item, i) {
			var found=false;
			columnized.forEach(function(jtem, j) {
				if(jtem.to===item.to && jtem.from===item.from){
					columnized[j].members.push(item);
					found=true;
				}
			});
			if(!found){
				var arr=new Array();
				arr.push(item);
				columnized.push({to:item.to, from:item.from, members:arr, id:item.id});
			}
			
		});
		
		return columnized.sort(function (a,b){
			return (a.to-b.to);
		});
	}
	
	

	render() {
		return (<span>
					<Table columnized={(this.columnize())} data={this.props.flightData} />
				</span>) ;
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (<table><tbody>
			<tr>
			<td><b>Destination: </b></td><td><input type="text" id="to" className="flightSearch" placeholder="To" value={this.props.valueTo} onChange={this.props.handleChangeTo}/>
			</td></tr>
			<tr>
			<td><b>From: </b></td><td><input type="text" id="from" className="flightSearch" placeholder="From" value={this.props.valueFrom} onChange={this.props.handleChangeFrom}/>
			</td></tr>
			<tr>
			<td><b>Arrives After: </b></td><td><input type="date" id="date" className="flightSearch" value={this.props.valueDate} onChange={this.props.handleChangeDate}/>
			</td></tr>
		</tbody></table>);
	}
}


class Table extends React.Component {
	constructor(props) {
		super(props);
		
		this.state={shown:-1};
		
		this.handleClick=this.handleClick.bind(this);
		this.shown=this.shown.bind(this);
		//this.selectData=this.selectData.bind(this);
	}
	
	handleClick(e){
		if(e.target.id!==""){
			this.setState({shown: e.target.id});
		}
	}
	
	shown(x){
		return this.state.shown===x;
	}
	
	
	/* OG Code
	selectData(keywordTo, keywordFrom, keywordDate, data){
		var output=new Array();
		keywordTo=keywordTo.toUpperCase();
		keywordFrom=keywordFrom.toUpperCase();
		var keywordDateObj=new Date(keywordDate);
		
		var regex=/[\s]/gi;
		
		keywordTo=keywordTo.replace(regex, "_");//Space to underscore
		keywordFrom=keywordFrom.replace(regex, "_");//Space to underscore
		
		//console.log(keyword);
		data.forEach(function(item, i) {
			if(item.from.toUpperCase().includes(keywordFrom) && item.to.toUpperCase().includes(keywordTo)){
				if(item.land.valueOf()>=keywordDateObj.valueOf()){
					output.push(item);
				}
			}
		});
		
		return output;
	}
	
	
	render() {
		
		
		var i=0;
		var output=this.selectData(this.props.keywordTo, this.props.keywordFrom, this.props.keywordDate, this.props.data).slice(0,30).map(function(item){
			return <TableEl data={item} key={i++}/>
		});
		
		return <span>{output}</span>;
	}
	
	*/
	render(){
		var that=this;
		var i=0;
		var output=this.props.columnized.map(function(item){
			//console.log();
			return <TableEl data={that.props.columnized[i]} shown={that.state.shown} id={that.props.columnized[i].id} key={i++} handleClick={that.handleClick}/>
		});
		return <span><h4>Click the route name to see schedule</h4>{output}</span>;
	}
	
}

class TableEl extends React.Component {
	constructor(props) {
		super(props);
		
		this.late=this.late.bind(this);
		
		//this.shown=false;
	}
	

	late(str){
		if(str.trim()==="True"){
			return <span className="green"> ON TIME</span>
		}else{
			return <span className="red"> LATE</span>
		}
	}
	
	/* OG Code
	render() {
		return (<span>
					<h4>To <b>{this.props.data.to.replace(/_/gi, " ")}</b> from <b>{this.props.data.from.replace(/_/gi, " ")}</b></h4><br />
					<span className="tab"></span>Arriving <i>{this.props.data.land.toLocaleString()}</i> <b>{this.late()}</b><br/>
				</span>)
	}
	*/
	
	render(){
		var that=this;
		var i=0;
		var output=this.props.data.members.map(function(item){
			return (<span key={i++}><span className="tab"></span>Arriving <i>{item.land.toLocaleString()}</i> {that.late(item.ontime)}<br/></span>);
		});
		
		var toShow;
		
		if(this.props.shown==this.props.id){
			toShow=output;
			
			//console.log(toShow);
			//console.log(output);
		}else{
			toShow="";
		}
		
		
		
		return (<span onClick={this.props.handleClick} key={this.props.id} >
					<span id={this.props.id}>From <b id={this.props.id}>{this.props.data.from.replace(/_/gi, " ")}</b> to <b id={this.props.id}>{this.props.data.to.replace(/_/gi, " ")}</b></span><br/>
					{toShow}
				</span>)
	}
}

$(document).ready(function(){
	var el=document.getElementById("reactFlight");
	ReactDOM.render(<Flights />, el);
});