
 const e =React.createElement;
 const products_API = 'https://acme-users-api-rev.herokuapp.com/api/products';
const companies_API = 'https://acme-users-api-rev.herokuapp.com/api/companies';
const companyList=({companies})=>{
    const lis=companies.map(company=>e('li',{key:company.id},company.name));
 return e('ul',null,lis)
}
const productList=({products})=>{
    const lis=products.map(product=>
         e('li',{key:product.id},product.name));
        return e('ul',null,lis)
    
}
const Nav=({companies,products,view})=>{
    const productLink=e('a',{href:'#products',className:view==='products'?'selected':''},`Products(${products.length})`);
    const companyLink=e('a',{href:'#companies',className:view==='companies'?'selected':''},`Companies(${companies.length})`);
    return e('ul',{className:'nav'},productLink,companyLink);
}


 class App extends React.Component{
     constructor(){
         super();
   this.state={
      companies:[],
      products:[],
      view:window.location.hash.slice(1)
  }
}

 componentDidMount(){
     window.addEventListener('hashchange',()=>{
        const view=window.location.hash.slice(1);
        this.setState({view})
     })
       if(!window.location.hash.slice(1)){
           window.location.hash='companies';
       }
       Promise.all([axios.get(products_API),
        axios.get(companies_API)])
        .then(responses=> responses.map(response=>response.data))
          .then (([companies,products])=>{
            //console.log(companies,products)
            this.setState({companies,products})
          })
    }
     render(){
         const {companies,products,view} =this.state;
         const nav=e(Nav,{companies,products,view});
         let current;
         if(view==='companies'){
             current=e(companyList,{companies});
         }
         if(view==='products'){
            current=e(productList,{products});
        }
         return e('div',null,nav,current)

     }
    
}
const root = document.querySelector('#root');
 ReactDOM.render(e(App),root,()=>{
     console.log("It is working!I have rendered!")
 },
 )


