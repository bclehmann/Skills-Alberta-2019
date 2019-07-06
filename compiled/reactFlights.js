

class Flights extends React.Component {
	constructor(props) {
		super(props);

		var dateObj = new Date();
		var formattedDateStr = dateObj.getFullYear() + "-" + ("" + (dateObj.getMonth() + 1)).padStart(2, "0") + "-" + ("" + dateObj.getDate()).padStart(2, "0");

		this.state = { flightData: "", keywordTo: "", keywordFrom: "", keywordDate: formattedDateStr };

		this.getData = this.getData.bind(this);
		this.parseData = this.parseData.bind(this);

		this.handleChangeTo = this.handleChangeTo.bind(this);
		this.handleChangeFrom = this.handleChangeFrom.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.selectData = this.selectData.bind(this);
		this.getData();
	}

	handleChangeTo(e) {
		this.setState({ keywordTo: e.target.value });
	}

	handleChangeFrom(e) {
		this.setState({ keywordFrom: e.target.value });
	}

	handleChangeDate(e) {
		this.setState({ keywordDate: e.target.value });
	}

	selectData(keywordTo, keywordFrom, keywordDate, data) {
		var output = new Array();
		keywordTo = keywordTo.toUpperCase();
		keywordFrom = keywordFrom.toUpperCase();
		var keywordDateObj = new Date(keywordDate);

		var regex = /[\s]/gi;

		keywordTo = keywordTo.replace(regex, "_"); //Space to underscore
		keywordFrom = keywordFrom.replace(regex, "_"); //Space to underscore

		//console.log(keyword);
		data.forEach(function (item, i) {
			if (item.from.toUpperCase().includes(keywordFrom) && item.to.toUpperCase().includes(keywordTo)) {
				if (item.land.valueOf() >= keywordDateObj.valueOf()) {
					output.push(item);
				}
			}
		});

		return output;
	}

	getData() {
		var that = this;
		jQuery.post("/returnLocationData.php", "", function (data) {
			that.setState({ flightData: data });
		}, "text");
	}

	parseData() {
		var raw = this.state.flightData;

		var rawByLine = raw.split("\n");

		var objArr = new Array();

		rawByLine.forEach(function (item, i) {
			if (i > 0) {
				//nuke first line
				var lnArr = item.split(",");
				var obj = {
					from: lnArr[0],
					to: lnArr[1],
					depart: new Date(lnArr[2]),
					land: new Date(lnArr[3]),
					flightTime: lnArr[4],
					ontime: lnArr[5],
					id: i
				};

				objArr.push(obj);
			}
		});

		return objArr;
	}

	render() {
		return React.createElement(
			"span",
			null,
			React.createElement(SearchBar, { valueDate: this.state.keywordDate, valueTo: this.state.keywordTo, valueFrom: this.state.keywordFrom, handleChangeDate: this.handleChangeDate, handleChangeTo: this.handleChangeTo, handleChangeFrom: this.handleChangeFrom, data: this.props.flightData }),
			React.createElement(NextFlights, { flightData: this.selectData(this.state.keywordTo, this.state.keywordFrom, this.state.keywordDate, this.parseData(this.state.flightData)) })
		);
	}
}

class NextFlights extends React.Component {
	constructor(props) {
		super(props);

		this.columnize = this.columnize.bind(this);
	}

	columnize() {
		var data = this.props.flightData;
		var columnized = new Array();

		data.forEach(function (item, i) {
			var found = false;
			columnized.forEach(function (jtem, j) {
				if (jtem.to === item.to && jtem.from === item.from) {
					columnized[j].members.push(item);
					found = true;
				}
			});
			if (!found) {
				var arr = new Array();
				arr.push(item);
				columnized.push({ to: item.to, from: item.from, members: arr, id: item.id });
			}
		});

		return columnized.sort(function (a, b) {
			return a.to - b.to;
		});
	}

	render() {
		return React.createElement(
			"span",
			null,
			React.createElement(Table, { columnized: this.columnize(), data: this.props.flightData })
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			"table",
			null,
			React.createElement(
				"tbody",
				null,
				React.createElement(
					"tr",
					null,
					React.createElement(
						"td",
						null,
						React.createElement(
							"b",
							null,
							"Destination: "
						)
					),
					React.createElement(
						"td",
						null,
						React.createElement("input", { type: "text", id: "to", className: "flightSearch", placeholder: "To", value: this.props.valueTo, onChange: this.props.handleChangeTo })
					)
				),
				React.createElement(
					"tr",
					null,
					React.createElement(
						"td",
						null,
						React.createElement(
							"b",
							null,
							"From: "
						)
					),
					React.createElement(
						"td",
						null,
						React.createElement("input", { type: "text", id: "from", className: "flightSearch", placeholder: "From", value: this.props.valueFrom, onChange: this.props.handleChangeFrom })
					)
				),
				React.createElement(
					"tr",
					null,
					React.createElement(
						"td",
						null,
						React.createElement(
							"b",
							null,
							"Arrives After: "
						)
					),
					React.createElement(
						"td",
						null,
						React.createElement("input", { type: "date", id: "date", className: "flightSearch", value: this.props.valueDate, onChange: this.props.handleChangeDate })
					)
				)
			)
		);
	}
}

class Table extends React.Component {
	constructor(props) {
		super(props);

		this.state = { shown: -1 };

		this.handleClick = this.handleClick.bind(this);
		this.shown = this.shown.bind(this);
		//this.selectData=this.selectData.bind(this);
	}

	handleClick(e) {
		if (e.target.id !== "") {
			this.setState({ shown: e.target.id });
		}
	}

	shown(x) {
		return this.state.shown === x;
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
	render() {
		var that = this;
		var i = 0;
		var output = this.props.columnized.map(function (item) {
			//console.log();
			return React.createElement(TableEl, { data: that.props.columnized[i], shown: that.state.shown, id: that.props.columnized[i].id, key: i++, handleClick: that.handleClick });
		});
		return React.createElement(
			"span",
			null,
			React.createElement(
				"h4",
				null,
				"Click the route name to see schedule"
			),
			output
		);
	}

}

class TableEl extends React.Component {
	constructor(props) {
		super(props);

		this.late = this.late.bind(this);

		//this.shown=false;
	}

	late(str) {
		if (str.trim() === "True") {
			return React.createElement(
				"span",
				{ className: "green" },
				" ON TIME"
			);
		} else {
			return React.createElement(
				"span",
				{ className: "red" },
				" LATE"
			);
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

	render() {
		var that = this;
		var i = 0;
		var output = this.props.data.members.map(function (item) {
			return React.createElement(
				"span",
				{ key: i++ },
				React.createElement("span", { className: "tab" }),
				"Arriving ",
				React.createElement(
					"i",
					null,
					item.land.toLocaleString()
				),
				" ",
				that.late(item.ontime),
				React.createElement("br", null)
			);
		});

		var toShow;

		if (this.props.shown == this.props.id) {
			toShow = output;

			//console.log(toShow);
			//console.log(output);
		} else {
			toShow = "";
		}

		return React.createElement(
			"span",
			{ onClick: this.props.handleClick, key: this.props.id },
			React.createElement(
				"span",
				{ id: this.props.id },
				"From ",
				React.createElement(
					"b",
					{ id: this.props.id },
					this.props.data.from.replace(/_/gi, " ")
				),
				" to ",
				React.createElement(
					"b",
					{ id: this.props.id },
					this.props.data.to.replace(/_/gi, " ")
				)
			),
			React.createElement("br", null),
			toShow
		);
	}
}

$(document).ready(function () {
	var el = document.getElementById("reactFlight");
	ReactDOM.render(React.createElement(Flights, null), el);
});