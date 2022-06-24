import { gql } from '@apollo/client'

export const GET_MISSION_INFO = gql`
  query getMission($missionId: ID! ) {
    mission(id: $missionId) {
    id
    name
    description
    manufacturers
    twitter
    website
    wikipedia
    payloads {
        payload_type
        payload_mass_lbs
      }
    }
  }
`
export interface GetMissionVariables {
  missionId: string
}

export interface GetMissionResult {
  mission: Mission
}

export const GET_ALL_MISSIONS = gql`
  query getMissions {
    missions {
      id
      name
      manufacturers
    }
  }
`

export interface GetAllMissionsResults {
  missions: Pick<Mission, 'id' | 'name' | 'manufacturers'>[]
}

export interface Mission {
  id: string
  name: string
  description: string
  manufacturers: string[]
  website: string
  wikipedia: string
  twitter: string
  payloads: Payload[]
}

export interface Payload {
  payload_type: string
  payload_mass_lbs: number
}

