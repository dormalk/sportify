import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccountForm } from '../../components/CreateAccountForm';

test('should render SignInBox correctly', () => {
    const wrapper = shallow(<CreateAccountForm/>);
    expect(wrapper).toMatchSnapshot();
});


test('should set first name on input change', () => {
    const value = 'israel';
    const wrapper = shallow(<CreateAccountForm />);
    wrapper.find('input').at(0).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('user').fname).toBe(value);
});

test('should set last name on input change', () => {
    const value = 'israeli';
    const wrapper = shallow(<CreateAccountForm />);
    wrapper.find('input').at(1).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('user').lname).toBe(value);
});


test('should set email on input change', () => {
    const value = 'example@gmail.com';
    const wrapper = shallow(<CreateAccountForm />);
    wrapper.find('input').at(2).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('user').email).toBe(value);
});

test('should set password on input change', () => {
    const value = '1234567';
    const wrapper = shallow(<CreateAccountForm />);
    wrapper.find('input').at(3).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('user').password).toBe(value);
});

test('should set confirmed password on input change', () => {
    const value = '1234567';
    const wrapper = shallow(<CreateAccountForm />);
    wrapper.find('input').at(4).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('c_password')).toBe(value);
});


test('should set error if passwords not match', () => {
    const password1 = '1234567';
    const password2 = 'q1w2e3';
    const wrapper = shallow(<CreateAccountForm />);
    wrapper.find('input').at(3).simulate('change', {
        target: { value:password1 }
    });

    wrapper.find('input').at(4).simulate('change', {
        target: { value:password2 }
    });

    expect(wrapper.state('erroe')).not.toBe('');
});

test('should not set profile picture if size not valid', () => {
    const startUploadImage = jest.fn();
    const type = 'image/jpeg';
    const size = 685750;
    const wrapper = shallow(<CreateAccountForm startUploadImage={startUploadImage}/>);
    wrapper.find('input').at(5).simulate('change', {
        target: { files: [
            {
                type,
                size
            }
        ]}
    });
    expect(startUploadImage).not.toHaveBeenCalled();
});

test('should not set profile picture if type not valid', () => {
    const startUploadImage = jest.fn();
    const type = 'image/pdf';
    const size = 385750;
    const wrapper = shallow(<CreateAccountForm startUploadImage={startUploadImage}/>);
    wrapper.find('input').at(5).simulate('change', {
        target: { files: [
            {
                type,
                size
            }
        ]}
    });
    expect(startUploadImage).not.toHaveBeenCalled();
});


test('should set profile picture', () => {
    const startUploadImage = jest.fn().mockReturnValueOnce(Promise.resolve('result1'));
    const type = 'image/png';
    const size = 385750;
    const wrapper = shallow(<CreateAccountForm startUploadImage={startUploadImage}/>);
    wrapper.find('input').at(5).simulate('change', {
        target: { files: [
            {
                type,
                size
            }
        ]}
    });
    expect(startUploadImage).toHaveBeenCalled();
});

test('should call startCreateNewUser when form submit', () => {
    const startCreateNewUser = jest.fn().mockReturnValueOnce(Promise.resolve('result1'));
    const wrapper = shallow(<CreateAccountForm startCreateNewUser={startCreateNewUser}/>);
    wrapper.find('form').simulate('submit',{
        preventDefault() {}
    });
    expect(startCreateNewUser).toHaveBeenCalled();
});