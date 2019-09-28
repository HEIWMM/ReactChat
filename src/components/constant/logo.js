import React from 'react'
import Sass from '../../css/logo.scss'
const src = 'http://img5.imgtn.bdimg.com/it/u=2463092249,3793343584&fm=26&gp=0.jpg'
export default function Logo(){
    return (<div><img src={src} alt="logo" className={Sass.logo}></img></div>)
}