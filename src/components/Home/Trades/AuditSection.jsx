import { format } from 'timeago.js'
import ClockIcon from '../../../icons/ClockIcon.jsx'
import TradeLogs from './TradeLogs.jsx'

const AuditSection = ({data, setOpenTradeDrawer}) => {



  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-end">
        <div className="flex gap-4  items-center">
          <div className={`ml-1.5 w-4 h-4  ring-[7px] ring-Primary rounded-md bg-transparent mt-12`}></div>
          <span className="font-main text-2xl font-semibold text-darkBlue dark:text-white2 mt-12">
            Audit Trail
          </span>
        </div>
        <div className="flex items-center h-8 gap-1">
          <div className="w-8 h-8">
            <ClockIcon />
          </div>
          <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
              {format(data.createdAt)}
          </span>
        </div>
      </div>
      <div className="mt-12">
        <TradeLogs props={data} />
      </div>
    </div>
  )
}

export default AuditSection