import React         from 'react'
import Tabs          from '../../../components/Tabs/Tabs'
import UserDashboard from './dashboard/UserDashboard'
import UserStatistic from './statistic/UserStatistic'
import MyProfile     from './myProfile/Dashboard'

const UserView = () => {

  return (
    <div className={'d-flex p-3'}>
      <Tabs
                tabs={
                  [
                    {
                      tabName: 'Info',
                      tabContent: UserDashboard
                    },
                    {
                      tabName: 'Statistic',
                      tabContent: UserStatistic
                    },
                    {
                      tabName: 'My Profile',
                      tabContent: MyProfile
                    }
                  ]
                }
                stateTab={{active: 0}}
      />
    </div>
  )

}

export default UserView