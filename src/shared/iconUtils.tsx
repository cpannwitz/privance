import AnchorIcon from '@mui/icons-material/AnchorOutlined'
import EarthIcon from '@mui/icons-material/PublicOutlined'
import RocketIcon from '@mui/icons-material/RocketOutlined'
import CarIcon from '@mui/icons-material/DirectionsCarOutlined'
import TrainIcon from '@mui/icons-material/DirectionsTransitOutlined'
import FlightIcon from '@mui/icons-material/FlightTakeoffOutlined'
import WalkIcon from '@mui/icons-material/DirectionsWalkOutlined'
import BikeIcon from '@mui/icons-material/DirectionsBikeOutlined'
import RestaurantIcon from '@mui/icons-material/RestaurantMenuOutlined'
import WorkIcon from '@mui/icons-material/WorkOutline'
import MovieIcon from '@mui/icons-material/LocalMoviesOutlined'
import MusicIcon from '@mui/icons-material/MusicNoteOutlined'
import AppIcon from '@mui/icons-material/AppShortcutOutlined'
import StarIcon from '@mui/icons-material/StarBorderOutlined'
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import GroupIcon from '@mui/icons-material/GroupOutlined'
import PetIcon from '@mui/icons-material/PetsOutlined'
import CakeIcon from '@mui/icons-material/CakeOutlined'
import BallIcon from '@mui/icons-material/SportsBaseballOutlined'
import LightbulbIcon from '@mui/icons-material/LightbulbOutlined'
import ShoppingIcon from '@mui/icons-material/ShoppingBagOutlined'
import PlantIcon from '@mui/icons-material/YardOutlined'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import PhoneIcon from '@mui/icons-material/PhoneOutlined'
import TvIcon from '@mui/icons-material/TvOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCardOutlined'

import PlaceholderIcon from '@mui/icons-material/HelpOutlineOutlined'

import { ReactElement } from 'react'

export function getIconByName(name: string) {
  return icons[name]
}

export const placeholderIcon = <PlaceholderIcon />

// TODO: add more Icons, like paypal, amazon etc

export const icons: { [key: string]: ReactElement } = {
  anchor: <AnchorIcon />,
  earth: <EarthIcon />,
  rocket: <RocketIcon />,
  car: <CarIcon />,
  train: <TrainIcon />,
  flight: <FlightIcon />,
  walk: <WalkIcon />,
  riding: <BikeIcon />,
  restaurant: <RestaurantIcon />,
  suitcase: <WorkIcon />,
  movie: <MovieIcon />,
  music: <MusicIcon />,
  apps: <AppIcon />,
  star: <StarIcon />,
  settings: <SettingsIcon />,
  group: <GroupIcon />,
  bearsmile: <PetIcon />,
  cake: <CakeIcon />,
  basketball: <BallIcon />,
  lightbulb: <LightbulbIcon />,
  tshirt: <ShoppingIcon />,
  plant: <PlantIcon />,
  home: <HomeIcon />,
  phone: <PhoneIcon />,
  tv: <TvIcon />,
  bankcard: <CreditCardIcon />
}
