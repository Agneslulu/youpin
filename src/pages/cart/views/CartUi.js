import  React,{ Component } from 'react'
import GoBack from 'images/std_tittlebar_main_device_back_normal.png'
import { withRouter,Link } from 'react-router-dom'
import check from 'images/std_icon_checkbox_check.png'
import uncheck from 'images/std_icon_checkbox_uncheck.png'
import cart_grey from 'images/cart_grey.png'
import {fromJS} from 'immutable'
import ChangeNum from "components/common/cart/ChangeNum"
import { HomeContainer,Header,ZhenXuan,Item,Footer,Quanxuan} from './styledComponents'
import Checkbox from './Checkbox'
import { Modal,Toast, Flex } from 'antd-mobile';

// import { connect } from 'react-redux'
// import { UPDATE_CART_NUM } from 'pages/home/actionTypes'

// const mapState = (state) => {
//   return {
//     num: state.getIn(["home",'num'])
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     update (num) {
//       dispatch({
//         type: UPDATE_CART_NUM,
//         num
//       })
//     }
//   }
// }

const alert = Modal.alert;


class CartUi extends Component {
    constructor (props) {
        super(props)
        this.state = {
            chooseList : localStorage["xiaomicart"]?Object.keys(JSON.parse(localStorage["xiaomicart"])):[],
            chooseCheck : 0,
            Allchoose : false,
            reverseCheck : false,
            isAuto : false,
            totle:0,
            bianji:false
        }
        this.goBack = this.goBack.bind(this)
        this.changeBianji = this.changeBianji.bind(this)
        this.delete = this.delete.bind(this)
        this.sureDelete = this.sureDelete.bind(this)
    }
    Allchoose(e){
        let num = 0;
        if(localStorage["xiaomicart"]){
            Object.keys(JSON.parse(localStorage["xiaomicart"])).map(k=>{
                num +=Number(JSON.parse(localStorage["xiaomicart"])[k].num)*Number(JSON.parse(localStorage["xiaomicart"])[k].price/100)
            })
        }
           
        if(this.state.Allchoose){
            this.setState({
                chooseCheck : 0,
                Allchoose : false,
                isAuto : false,
                totle:0,
                reverseCheck : !this.state.reverseCheck,
            })
            let obj = JSON.parse(localStorage["xiaomicart"])
            Object.keys(JSON.parse(localStorage["xiaomicart"])).map(k=>{
                obj[k].checked=false
            })
            localStorage["xiaomicart"]=JSON.stringify(obj)
        }else{
            this.setState({
                Allchoose : true,
                chooseCheck : this.state.chooseList.length,
                isAuto : false,
                totle:num,
                reverseCheck : !this.state.reverseCheck,
            });
            let obj = JSON.parse(localStorage["xiaomicart"])
            Object.keys(JSON.parse(localStorage["xiaomicart"])).map(k=>{
                obj[k].checked=true
            })
            localStorage["xiaomicart"]=JSON.stringify(obj)
        }
    }
    checkAllChoose(ItemChecked){
        console.log('"llllllllllllll" :',"llllllllllllll")
        let num = 0;
        if(localStorage["xiaomicart"]){
            Object.keys(JSON.parse(localStorage["xiaomicart"])).map(k=>{
                if(JSON.parse(localStorage["xiaomicart"])[k].checked===true){
                    num +=Number(JSON.parse(localStorage["xiaomicart"])[k].num)*Number(JSON.parse(localStorage["xiaomicart"])[k].price/100)
                }
            })
        }
        this.setState({
            totle:num
        })
        if(this.state.isAuto === true)this.state.isAuto = false;
        ItemChecked ? this.state.chooseCheck++ : this.state.chooseCheck--;
        // console.log(this.state.chooseCheck);
        if(this.state.chooseCheck === this.state.chooseList.length){
            this.setState({
                Allchoose : true,
                isAuto : true
            })
        }else{
            if(this.state.Allchoose === true){
                this.setState({
                    Allchoose : false,
                    isAuto : true
                });
            }
        }
    }
    Reversechoose(e){
        let newNum = this.state.chooseList.length - this.state.chooseCheck;
        if(newNum === this.state.chooseList.length){
            this.setState({
                Allchoose : true,
                isAuto : true
            })
        }else{
            this.setState({
                Allchoose : false,
                isAuto : true
            })
        }
        this.setState({
            reverseCheck : !this.state.reverseCheck,
            chooseCheck : this.state.chooseList.length - this.state.chooseCheck
        });
    }

    changeTotle(num){
        this.setState({
            totle:num
        })
    }
    render () {
        return (
            <HomeContainer>
                <Header>
                    <img src={GoBack} alt="" onClick={this.goBack}></img>
                    购物车
                    {this.state.bianji?<span onClick={this.changeBianji} style={{marginRight:".1rem",fontSize:".12rem",color:"rgb(191, 17, 17)"}}>完成</span>:
                    <span onClick={this.changeBianji} style={{marginRight:".1rem",fontSize:".12rem",color:"rgb(51,51,51)"}}>编辑</span>}
                </Header>
                <div id="main-scroll">
                    {localStorage["xiaomicart"]?
                        (<ZhenXuan>
                            <input id="quan" type="checkbox" onChange={() => {}} onClick = {(e)=>{this.Allchoose(e)}} checked = {this.state.Allchoose} style={{background:"url("+{check}+")",width:".18rem",height:".18rem",marginRight:".07rem"}}/>
                            <label htmlFor="quan">
                                <img src={this.state.Allchoose?check:uncheck} alt="" style={{width:".18rem",height:".18rem",marginRight:".07rem"}}/>
                            </label>
                            <div className="xuan">有品甄选</div>
                            {this.state.totle<99?<span>满99.00元免运费</span>:<span>已免运费</span>}
                            
                        </ZhenXuan>)
                        :(<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:'1rem'}}>
                            <img src={cart_grey} alt="" style={{width:'.91rem',height:".85rem"}}/>
                            <div style={{display:"flex",flexDirection:"column",marginLeft:'.2rem'}}>
                                <p style={{color:"rgb(152, 131, 120)"}}>购物车还没有商品哦</p>
                                <Link to="/home" style={{display:"block",width:".77rem",height:".23rem",background:"rgb(226, 115, 104)",textAlign:"center",lineHeight:".23rem",color:"#fff",marginTop:".12rem"}}>去逛逛</Link>
                            </div>                           
                        </div>)
                    }
                    {/* {Object.keys(JSON.parse(localStorage["xiaomicart"])).map((key,i)=>{ */}
                    {/* 渲染购物车列表onClick = {(e)=>{this.Reversechoose(e)}} checked = {this.state.reverseCheck} */}
                    {localStorage["xiaomicart"]&&fromJS(JSON.parse(localStorage["xiaomicart"])).keySeq().map((key,i)=>{
                        // console.log('key :',key)
                        return(
                            <Item key={key}>
                                <Checkbox key={key} keys={key} index={i} checkAllChoose = {(ItemChecked)=>{this.checkAllChoose(ItemChecked)}} Allchoose = {this.state.Allchoose} Reverse = {this.state.reverseCheck} isAuto = {this.state.isAuto}></Checkbox>
                                <img src={JSON.parse(localStorage["xiaomicart"])[key]&&JSON.parse(localStorage["xiaomicart"])[key].img} alt="" style={{width:".73rem",height:".73rem",marginRight:".07rem",border:"1px solid #eee"}}/>
                                <div className="right">
                                    <p>{key}</p>
                                    <div className="bottom">
                                        <p className="price">￥<span>{(JSON.parse(localStorage["xiaomicart"])[key].price/100).toFixed(2)}</span></p>
                                        <ChangeNum num={JSON.parse(localStorage["xiaomicart"])[key].num} keys={key} changeTotle={(num)=>{this.changeTotle(num)}}></ChangeNum>
                                    </div>
                                    
                                </div>
                                
                            </Item>
                            )
                    })}
                </div>
                
                {localStorage["xiaomicart"]?
                    <Footer>
                        <Quanxuan>
                            <input id="quan" type="checkbox" onChange={() => {}} onClick = {(e)=>{this.Allchoose(e)}} checked = {this.state.Allchoose} style={{background:"url("+{check}+")",width:".18rem",height:".18rem",marginRight:".07rem"}}/>
                            <label htmlFor="quan">
                                <img src={this.state.Allchoose?check:uncheck} alt="" style={{width:".18rem",height:".18rem",marginRight:".07rem"}}/>
                            </label>
                            <div className="xuan">全选</div>
                            {this.state.bianji?
                            <div className="totle">
                                <div className="goto" onClick={this.sureDelete}>删除所选</div>
                            </div>
                            :
                            <div className="totle">
                                <div>合计：<span className="red">￥{this.state.totle.toFixed(2)}</span></div>
                                <div className="goto">去结算</div>
                            </div>
                            }
                            
                        </Quanxuan>
                    </Footer>
                    :""
                }
                
            </HomeContainer>
        )
    }

    goBack(){
        this.props.history.goBack()
    }
    changeBianji(){
        this.setState({
            bianji:!this.state.bianji
        })
    }

    sureDelete(){
        let obj = JSON.parse(localStorage["xiaomicart"])
        let bStop = false
        for(var k in obj){
            if(obj[k].checked === true){
                bStop = true
                break
            }
        }
        if(bStop){
            alert('删除信息','确认要从购物车删除所选商品？', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => this.delete() },
            ])
        }else{
            this.showToast()
        }
        
    }
    delete(){
        let obj=JSON.parse(localStorage["xiaomicart"])
        for(var k in obj){
            if(obj[k].checked===true){
                delete obj[k]
            }
        }
        
        localStorage["xiaomicart"]=JSON.stringify(obj)
        this.setState({
            chooseList : localStorage["xiaomicart"]?Object.keys(JSON.parse(localStorage["xiaomicart"])):[],
            totle:0
        })

        if(localStorage["xiaomicart"]==="{}"){
            localStorage.removeItem("xiaomicart")
        }
    }
    showToast() {
        Toast.info('请选择你要删除的商品~', 1.5);
      }
}

export default withRouter(CartUi)