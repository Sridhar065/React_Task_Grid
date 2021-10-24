import React from 'react'
import logo from './logo.svg';
import './App.css';



export default class Tables extends React.Component {
  static displayName = Tables.name;

  constructor(props) {
    super(props);
    this.state = {
      name: [],
      name_dl: [],
      tagline: "",
      first_brewed: "",
      description: "",
      image_url: "",
      abv: "",
      ibu: "",
      target_fg: "",
      target_og: "",
      ebc: "",
      srm: "",
      ph: "",
      attenuation_level: "",
      Search: "",
      loading: true
    };

    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=10')
      .then(response => response.json())
      .then(data => {
        console.log(data.content)
        this.setState({ name: data, loading: false });
      });
  }







  componentWillMount() {
    this.getName();
  }

  async getName() {

    this.setState({
      loading: true
    });
    await fetch('https://api.punkapi.com/v2/beers?page=1&per_page=10', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }

    }).then(res => res.json())
      .then((result) => {
        if (result) {
          console.log(result)
          this.setState({
            name_dl: result,
            Search: result.name_dl,
            loading: false
          });
          console.log(this.state.name_dl);
        }
        else {

          return false;
        }
      }, function (error) {
        debugger;
        return false;
      })

  }





  async Search(e) {
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=10')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ name: data, loading: false });
      });
  }

  handleAssign(event, values) {
    var value = values;
    console.log(event.target.value)
    console.log(values)
    this.setState({
      Search: event.target.value
    });
  }



  handleChange(event) {
    var value = event.target.name;
    this.setState({
      [value]: event.target.value
    });
  }


  static renderForecastsTable(name) {
    return (
      <table className="hed-row12">
        <thead>
          <tr className="hed-row">
            <th className="hed-row1">ID</th> <br />
            <th className="hed-row2">name</th> <br />
            <th className="hed-row2">tagline</th> <br />
            <th className="hed-row3">first_brewed</th> <br />
            <th className="hed-row3">description</th> <br />
            <th className="hed-row4">image_url</th> <br />
            <th className="hed-row5">abv</th> <br />
            <th className="hed-row5">ibu</th> <br />
            <th className="hed-row2">target_fg</th> <br />
            <th className="hed-row3">target_og</th> <br />
            <th className="hed-row4">ebc</th> <br />
            <th className="hed-row5">srm</th> <br />
            <th className="hed-row5">ph</th> <br />
            <th className="hed-row5">attenuation_level</th> <br />
          </tr>
        </thead>



        <tbody>
          {name.map(name =>
            <tr className="hed-row6" key={name.id}>
              <td>{name.id}</td> <br />
              <td>{name.name}</td> <br />
              <td>{name.tagline}</td> <br />
              <td>{name.first_brewed}</td> <br /> <br />
              <td>{name.description}</td> <br /> <br />
              <td>{name.image_url}</td>  <br />
              <td>{name.abv}</td>  <br />
              <td>{name.ibu}</td>  <br />
              <td>{name.target_fg}</td> <br />
              <td>{name.target_og}</td> <br /> <br />
              <td>{name.ebc}</td>  <br />
              <td>{name.srm}</td>  <br />
              <td>{name.ph}</td>  <br />
              <td>{name.attenuation_level}</td>  <br />



            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Tables.renderForecastsTable(this.state.name);

    return (
      <div className='table-striped'>

        <div>

          search<select name="Search" className="dataip12" style={{ width: "11%", height: "20px", borderRadius: "4px", height: "28px" }} value={this.state.Search}
            onChange={this.handleAssign.bind(this)} >

            {this.state.name_dl.map((obj) =>
              <option key={obj.name}>{obj.name}</option>
            )};
      </select>
          <br /> <br />


          <button className="btn23" onClick={this.Search.bind(this)} >Search</button> <br /> <br />
        </div>

        {contents}
      </div>
    );
  }
}




