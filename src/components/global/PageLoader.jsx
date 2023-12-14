import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <div className="z-50">
        <motion.img
          src="https://res.cloudinary.com/dbe7l4mop/image/upload/v1701237701/assets/ynvynktnpsu9r11vrq7f.png"
          alt="Logo"
          className="w-16 h-16"
          animate={{
            scale: [1, 1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 360, 0 , 0],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            times: [0, 0.4, 0.6, 0.4, 1],
            repeat: Infinity,
            repeatDelay: 0.4
          }}
        />
      </div>
  )
}

export default PageLoader