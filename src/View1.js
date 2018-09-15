import React, { Component } from 'react';
import './View1.css';
import traincoaches from './traincoaches.png';

export default class View1 extends Component {

    state = {index : 0};

    componentDidMount() {
      console.log("test");
      fetch('objects.json')
      .then(response => response.json())
      .then((data) => {
            this.setState({data: data});
        }).catch(function(err) {
            console.error(err)
        });;
        
        window.setTimeout(() => this.setState({train:true}), 1000);
        window.setTimeout(() => this.setState({entered:true}), 5000);
        window.setTimeout(() => this.setState({goagain:true}), 12000);
        let index = 0;
        let that = this;
        window.setInterval(() => {
            let data = that.state.data;
            if(!data) return;
            Object.keys(data).map((key, i) => {
                let x = data[key][Math.min(index, data[key].length-1)][0]/10;
                let y = data[key][Math.min(index, data[key].length-1)][1]/10;
                if(that.refs2[key]) {
                    that.refs2[key].setAttribute('transfrom', `translate(${x},${y})`);
                }
            });
            index++;
        }, 400);
    }

    refs2 = {};
    
    render() {        
        let {data, entered, train, goagain, index }= this.state;

        return (
            <React.Fragment>
            <svg style={{width:'100vw', height:'100vh', position: 'absolute', top: 0, left: 0}} viewBox="-500 -100 700 200">
                	
                
                <rect x="-500" y="-50" width="1000" height="40"
                style={{fill: 'grey'}} />
                
                <image href={traincoaches} className={"train " + ( train ? "animated " : "") + ( goagain ? "byebye " : "")} x="0" y="-41" height="30px"></image>  

                <rect x="-500" y="55" width="1000" height="40"
                style={{fill: 'grey'}} />

              
                {data && Object.keys(data).map((key, i) => {
                    if(i > 50 || i < 1) return;
                    let points="";
                    data[key].forEach((pos, i) => {
                        points +=  pos[0]/10 + "," + pos[1]/10 + " ";
                    });
                    let go = entered && data[key][data[key].length-1][1] < 15;
                    return  <g key={key}><polyline 
                                key={'p'+key}
                                className={"path " + (go ? "go" : "")}
                                points={points} 
                                stroke="black" 
                                strokeWidth="0.1"
                                fill="none" />
                    
                                {index <= data[key].length && <circle 
                                key={"c" + key}
                                cx="0"
                                cy="0"
                                ref={(ref) => this.refs2[key] = ref}
                                style={{
                                    transition: 'transform 0.04s linear',
                                    transform:`matrix(1, 0, 0, 1, 0, 0)`
                                }}
                                r="1" fill="red" />}
                    </g>
            })}
            </svg>
            </React.Fragment>
            );
  };
}