
 import React from 'react';
import './App.css';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isEditable: null,
       
      input:"",
      nameError:"",
      
    };


  }





  componentDidMount() {
    let check = window.localStorage.getItem('data');
    check = JSON.parse(check);
    if (Array.isArray(check) && check.length > 0) {
      this.setState({ data: check });
    }
  }
  submitForm = (e) => {
 

    e.preventDefault();
    const inputValue1 = e.target.input.value;
    const inputValue2 = e.target.email.value;
    const inputValue3 = e.target.pass.value;

    this.setState(
      (prevState) => ({ data: [...prevState.data, inputValue1] }),
      () => {
        window.localStorage.setItem('data', JSON.stringify(this.state.data));
      }
    );

    this.setState(
      (prevState) => ({ data: [...prevState.data, inputValue2] }),
      () => {
        window.localStorage.setItem('data', JSON.stringify(this.state.data));
      }
    );

    this.setState(
      (prevState) => ({ data: [...prevState.data, inputValue3] }),
      () => {
        window.localStorage.setItem('data', JSON.stringify(this.state.data));
      }
    );
    
  
  };

  edit = (index) => {
    this.setState({ isEditable: index });
  };

  updateForm = (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;
    const { data, isEditable } = this.state;
    const newData = [...data]; //cloning state data
    newData[isEditable] = inputValue;
    this.setState({ data: newData }, () => {
      window.localStorage.setItem('data', JSON.stringify(this.state.data));
    });
  };

  deleteData = () => {
    const { data, isEditable } = this.state;
    const newData = [...data]; //cloning state data
    const filteredData = newData.filter((input, index) => index !== isEditable);
    this.setState({ data: filteredData, isEditable: null }, () => {
      window.localStorage.setItem('data', JSON.stringify(this.state.data));
    });
  };











valid(){

  if(this.state.input.includes("@"))
  {
    this.setState({nameError:"Invalid Name"})

  }
}


submit(){

  if(this.valid()){

  alert("submit")

  }
}




  render() {
    const { data, isEditable } = this.state;
    return (

      <div className="app">
        <form className=""  onSubmit={(e) => this.submitForm(e)}   >
          
          <input type="text" placeholder="Name" name="input"  onChange={(event)=>{this.setState({input:event.target.value})}}  /> <br/><br/>
          
          <p>{this.state.nameError}</p>

          
          
          <input type="text" placeholder="Email" name="email" onChange={(event)=>{this.setState({email:event.target.value})}} /> <br/><br/>
          <input type="text" placeholder="Password" name="pass" onChange={(event)=>{this.setState({pass:event.target.value})}} /> <br/><br/>

        
          <button onClick={()=>this.submit()}type="submit">Add Contact</button>
         

  
        </form>

      


        <div className="data">
          <ul>
            {data.map((input, index) => (
              <li key={input + index}>
                <div>
                  {input}
                  <button onClick={() => this.edit(index)}>Edit</button>
                </div>
                <div
                  style={{
                    display: `${isEditable !== index ? 'none' : 'block'}`,
                  }}
                >
                  <form onSubmit={(e) => this.updateForm(e)}>
                    <input type="text" name="input" />
                    <button type="submit">update</button>
                  </form>
                  <button type="button" onClick={this.deleteData}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default App;


