import React, { useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from"../../actions/profile"
import{ Link, withRouter } from "react-router-dom"
import styled from "styled-components"
import { Container, Paper } from '@material-ui/core';
//Todo:
//1: fix the height
//2: use typography for texts
//3: use material-ui for inputs

const ComponentWrapper = styled(Paper)`
	width: 40% !important;
	left: 30%;
    top: 4%;
    margin-top: 10px !important;
    max-height:90vh;
	position: absolute;
	@media only screen and (max-width: 600px) {
		width: 80% !important;
		left: 10%;
		top: 4%;
	}
`;
const ContainerWrapper = styled(Container)`
	padding: 15px;
	width: 100%;
	height: 100%;
`;

const EditProfile = ({ createProfile, history }) => {

    const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = e => {
		e.preventDefault();
		createProfile(formData, history);
	};
    const [formData, setFormData] = useState({
		location: '',
		role: '',
        experience:0,
        bio:"",
        facebook:""
    });

    const {
        location,
        role,
        experience,
        bio,
        facebook
    } = formData;

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    return (
        <section class="register">
        <div class="dark-overlay">
            <ComponentWrapper>
                <ContainerWrapper>
                    <h1 class="large text-primary">Edit</h1>
                    <p class="lead">
                        <i class="fas fa-user"></i> Create your FighterConnect profile
                    </p>
                    <small>* = required field</small>
                    <form class="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
                        <div class="form-group">
                            <input
                                type="text"
                                placeholder="* Your base gym"
                                name="location"
                                onChange={e => onChange(e)}
                            />
                            <small className='form-text'>
						    Suburb & state suggested (eg. Carnegie, VIC)
					        </small>
                         </div>
                        <div className='form-group'>
                            <select name='role' value={role} onChange={e => onChange(e)}>
                                <option value='0'>* Select Your Role</option>
                                <option value='Train To Fight'>Train To Fight</option>
                                <option value='Train for Fit'>Train for Fit</option>
                                <option value='Trainer'>Trainer</option>
                                <option value='Amateur Fighter'>Amateur Fighter</option>
                                <option value='Pro Fighter'>Pro Fighter</option>
                            </select>
                            <small className='form-text'>
                                Give us an idea of what you want to achieve
                            </small>
				        </div>
                        <div class="form-group">
                        <select name='experience' value={experience} onChange={e => onChange(e)}>
                                <option value={0}>Less than 1 year</option>
                                <option value={1}> 1 year </option>
                                <option value={2}> 2 years </option>
                                <option value={3}> 3 years </option>
                                <option value={4}> 4 years </option>
                                <option value={5}> more than 4 years </option>
                            </select>
                            <small className='form-text'>
						    *How many years have you trained
					        </small>
                        </div>
                        <div class="form-group">
                            <input
                                type="text"
                                placeholder=" "
                                name="bio"
                                onChange={e => onChange(e)}
                            />
                            <small className='form-text'>
						    Describe yourself in few sentences
					        </small>
                         </div>
                        
                <div className='my-2'>
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{displaySocialInputs && (
					<Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x' />
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={e => onChange(e)}
							/>
						</div>
                        </Fragment>
                      
                )}
                <input type="submit" class="btn btn-primary" value="Create Profile" />
                    </form>
                </ContainerWrapper>
            </ComponentWrapper>
        </div>
    </section>
    );
};   


const mapStateToProps = state => ({
	profile: state.profile
});
//withRouter 
export default connect(mapStateToProps, { createProfile })(
	withRouter(CreateProfile)
);