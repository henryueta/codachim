import { useEffect, useState } from "react";
import useHandleAxios from "../../hooks/useHandleAxios"
import useHandleNavigate from "../../hooks/useHandleNavigate";
import useHandleQuery from "../../hooks/useHandleQuery";

// const Home = () => {

//   const {onGet,onCreateCancelToken} = useHandleAxios();
//   const {onNavigate} = useHandleNavigate();
//   const [articleList,setArticleList] = useState<{
//     id:string,
//     title:string,
//     content:string
//   }[]>([]);


//   const queryArticles = ()=>{
//     return onGet({
//       url:"http://localhost:8081/articles",
//       cancelToken:onCreateCancelToken()
//     },{
//       onThen(result) {
//         return result.data
//       }
//     })
//   }

//   const key = ["articles"]
//   const {onQuery,onQueryClient,onMutation} = useHandleQuery();
//   const queryClient = onQueryClient();

//   const article_data = onQuery({
//     key:key,
//     action() {
//       return queryArticles()
//     },
//   })
  


//   const deleteMutation = ()=>{
//     return onMutation({
//     action:{
//       url:"http://localhost:8081/articles",
//       method:"delete",
//       cancelToken:onCreateCancelToken()
//     }},{
//       onThen(result) {
//         console.log(result)
//         queryClient.invalidateQueries({
//           queryKey:key
//         })
//       },
//       onCatch(error){
//         console.log(error)
//       }
//     })
//   }
  
//   const teste = deleteMutation()
    

  
//   useEffect(()=>{

//     !!article_data.data
//     &&
//     setArticleList(article_data.data as {
//     id:string,
//     title:string,
//     content:string
//   }[])

//   },[article_data.data])

//   if (article_data.isLoading) return <div>Loading...</div>;
//   if (article_data.error) return <div>Error loading posts</div>;

//   return (
//     <section
//     style={{
//       border:"0.1rem solid black",
//       borderRadius:"0.5rem",
//       padding:"1.5rem"
//     }}
//     >
//       {
//         teste.isPending 
//         && 'Apagando. . . '
    
//       }
//       <div style={{
//         display:"flex",
//         flexDirection:"column",
//         gap:"1rem"
//       }}>
//         {
//           !!articleList
//           &&
//           articleList.map((article)=>
//             <div 
//           style={{
//             display:"flex",
//             alignItems:"center",
//             justifyContent:"center",
//             gap:"1rem"
//           }}
//             key={article.id}>
//               {article.title}
//               <button>
//                 Editar
//               </button>
//               <button
//               disabled={teste.isPending}
//               onClick={()=>{
//                 teste.mutate({
//                   url_params:[{
//                     field:"id",
//                     value:article.id
//                   }]
//                 })
//               }}
//               >
//                 Excluir
//               </button>
//             </div>
//           )
//         }
//       </div>
//       <button
//       style={{
//         marginTop:"1rem"
//       }}
//       onClick={()=>{
//         onNavigate("/auth/login")
//       }}
//       >
//         Sair
//       </button>
//     </section>
//   )
// }

const Home = () => {
  const {onNavigate} = useHandleNavigate();
  return (
    <div>
      <button
      onClick={()=>{
        onNavigate("/auth/login")
      }}
      >Entrar</button>
    </div>
  )

}

export default Home
