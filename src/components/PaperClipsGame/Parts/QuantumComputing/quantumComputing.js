/**
* Libraries
*/

import React,{
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

/**
* Components
*/

import Button from '../../../../library/Button/button';
import Chip from '../../SmallParts/Chip/chip';

/**
* Styles
*/

import './quantumComputing.scss';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* QuantumComputing component definition and export
*/

class QuantumComputing extends Component {

    /**
    * Constructor
    */

    constructor (props){
        super(props);
        this.state = {
            chips: ['','']
        }
    }
    
    /**
    * Methods
    */

    computeOnClick = () => {
        this.props.showQuantCompMessage();
        if(this.props.changedToQOps){
            let captureQOps = this.props.qOps;
            this.props.captureCurrentQOps(captureQOps)
        }
    }

    renderChip = () => {
        return(
            <div className="quantumComputing-wrapper3">
                {this.state.chips.map((el,i)=>{
                    // if(el){
                        return(
                            <Chip
                                key={i}
                                showChip={this.props.showChip}
                                // onClick={() => this.handleOnClick(el.id, el.next, el.price, el.action, el.terminal)}
                                // valid={el.valid}
                                // priceOps={el.price.ops}
                                // priceCreat={el.price.creat}
                                // priceTrust={el.price.trust}
                                // id={el.id}
                                // action={el.action}
                                // i={i}
                            />
                        )
                    // }
                   
                })}
            </div>
        )        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.qOps !== this.props.qOps) {
            if(this.props.qOps === 360){
                this.props.stopAddingQOps();
                this.props.startSubtractingQOps();
            }
            if(this.props.qOps === -360){
                this.props.stopSubtractingQOps();
                this.props.startAddingQOps();
            }
        }      
    }

    /**
    * Markup
    */

    render(){
        return(
            <div className="quantumComputing">
                <div className="quantumComputing-label">Quantum Computing</div>
                {this.renderChip()}
                {/* {this.props.showChip ? <Chip/> : null} */}
                <div className={this.props.changedToQOps ? "quantumComputing-wrapper2" : "quantumComputing-wrapper1"}>
                    <Button
                        className="quantumComputing-button"
                        onClick={this.computeOnClick}
                        text={"Compute"}
                        // disabled={this.props.marketingButtonDisabled}
                    />
                    {this.props.changedToQOps ? 
                    <div className={this.props.showQCompMessage === 0 ? 'quantumComputing-text-with-effect0' : (this.props.showQCompMessage % 2 === 0 ? 'quantumComputing-text-with-effect1' :'quantumComputing-text-with-effect2' )}>
                        qOps: {this.props.currentQOps}
                    </div> : 
                    <div className={this.props.showQCompMessage === 0 ? 'quantumComputing-text-with-effect0' : (this.props.showQCompMessage % 2 === 0 ? 'quantumComputing-text-with-effect1' :'quantumComputing-text-with-effect2' )}>
                        Need Photonic Chips
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            showQCompMessage: state.business.showQCompMessage,
            showChip: state.business.showChip,
            changedToQOps: state.business.changedToQOps,
            qOps: state.business.qOps,
            currentQOps: state.business.currentQOps,
        };
    },
    (dispatch) => {
        return {
            showQuantCompMessage: bindActionCreators(Actions.showQuantCompMessage, dispatch),
            stopAddingQOps: bindActionCreators(Actions.stopAddingQOps, dispatch),
            startSubtractingQOps: bindActionCreators(Actions.startSubtractingQOps, dispatch),
            stopSubtractingQOps: bindActionCreators(Actions.stopSubtractingQOps, dispatch),
            startAddingQOps: bindActionCreators(Actions.startAddingQOps, dispatch),
            captureCurrentQOps: bindActionCreators(Actions.captureCurrentQOps, dispatch),
        };
    }
)(QuantumComputing);