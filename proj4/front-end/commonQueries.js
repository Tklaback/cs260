import axios from 'axios';

export async function sendData(){
    try{
      const response = await axios.post('/api/user', {
        name: 'ty',
        email: 'hello@gmail.com',
        phoneNumber: '123321123',
      })
      setCurUser(response.data);
      console.log(response.data);
    }catch(error){
      console.log("OH NO FROM CLIENT!")
    }
  };

  export async function getData(){
    const response = await axios.get('/api/users');
    console.log(response.data);
  }

  export async function deleteAll(){
    try{
      await axios.delete('/api/users');
    }catch(error){
      console.log("bad response");
    }
  }

  export async function deleteUser(userObj){
    try{
      console.log(userObj);
      // const response = await axios.delete(`/api/user/`);
      // console.log(response.data);
    }catch(error){
      console.log("delete did not work");
    }
  }