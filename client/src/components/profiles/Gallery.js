import React from 'react';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import styled from 'styled-components';

const ComponentWrap = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
    margin-bottom: 50px;
	overflow: scroll;
    flex-wrap:wrap;
    margin-top:5px;
`;


const GridListWrap = styled(GridList)`
flex-wrap:nowrap !important;
transform: translateZ(0);
`
const TileWrap = styled(GridListTile)`
height:40vh !important
@media only screen and (max-width: 950px) {
    height:30vh !important
  }
.MuiGridListTile-imgFullWidth {
    top: 50%;
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateY(-50%);
    object-fit: cover;

}

`

const TileBarWrap = styled(GridListTileBar)`
	background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%);
`;

const Gallery = () => {
	const DisplaySingleTile = ({ url, title }) => {
		return (
			<TileWrap rows={1} >
				<img src={url} alt={title} />
				<TileBarWrap title={title} />
			</TileWrap>
		);
	};

	return (
		<ComponentWrap>
            <GridListWrap cols={2.5}>
			{DisplaySingleTile({ url: process.env.PUBLIC_URL + '/galleryPic1.jpg', title: 'Versatile Training Options' })}
			{DisplaySingleTile({ url: process.env.PUBLIC_URL + '/galleryPic2.jpg', title: 'Build A Solid Community' })}
			{DisplaySingleTile({ url: process.env.PUBLIC_URL + '/galleryPic3.jpg', title: 'Improve Together' })}
            </GridListWrap>
        </ComponentWrap>
	);
};

export default Gallery;
