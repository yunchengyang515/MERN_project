import React from 'react'
import { GridList,GridListTile, GridListTileBar } from "@material-ui/core"
import styled from "styled-components"


const ComponentWrap = styled.div`
display:flex;
justify-content: space-between
`

const TileWrap = styled(GridListTile)`

`

const TileBarWrap = styled(GridListTileBar)`
background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
`

const Gallery = () => {

    const DisplaySingleTile = ({url, title})=>{
        return(
            <TileWrap>
                <img src ={url} alt={title}/>
                <TileBarWrap title = {title}/>
            </TileWrap>

        )
    };



    return (
        <ComponentWrap>
            {DisplaySingleTile({url:"../profile/1966-neil-leifer-muhammad-ali-001097515finaljpg.jpg",
        title:"Find training partner"})}
        </ComponentWrap>
    )
}

export default Gallery