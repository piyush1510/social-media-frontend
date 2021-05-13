import axios from 'axios';
import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import Card from '../components/Card';
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={posts:[],user:null};
  }
  componentDidMount(){
    const cookies = new Cookies();
    const token = cookies.get('token')
    if(token){
      axios.get('http://localhost:5000/posts',{
        headers:{'authorization':"Bearer "+token}
      }).then(res=>{
        console.log(res.data.posts)
        this.setState({posts:res.data.posts,user:res.data.user})
      }).catch(err=>{
        console.log(err.message);
      })
    }
  }
  createCards =()=>{
    return this.state.posts.map(ele=><Card title={ele.title} para={ele.content} imgLink={ele.image_link} time={ele.created_on} key={"p"+ele.id}/>)
  }
  render() {
    return (
      <div className="Home">
        {this.createCards()}
      </div>
    );
  }
}
