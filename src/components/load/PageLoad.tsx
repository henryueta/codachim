import {motion} from 'framer-motion'


const PageLoad = () => {
  return (
        <>
            <div className='pageLoadContainer'>
            {
            Array.from({length:4}).map((_,index)=>
                <motion.div
                    key={index}
                    animate={{
                        scale:[1,1,0.7,0.7,1,1],
                    }}                
                    transition={{
                    duration:2,
                    ease:"circInOut",
                    delay:index * 0.2,
                    repeat:Infinity,
                    repeatDelay:0
                    }}
                >
                </motion.div>
                )
            }
            </div>
            <div className='textContainer'>
                <span>Carregando página</span>
            </div>
        </>
  )
}

export default PageLoad
