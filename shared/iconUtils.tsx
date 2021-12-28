import AnchorLineIcon from "remixicon-react/AnchorLineIcon"
import EarthLineIcon from "remixicon-react/EarthLineIcon"
import RocketLineIcon from "remixicon-react/RocketLineIcon"
import CarLineIcon from "remixicon-react/CarLineIcon"
import TrainLineIcon from "remixicon-react/TrainLineIcon"
import FlightTakeoffLineIcon from "remixicon-react/FlightTakeoffLineIcon"
import WalkLineIcon from "remixicon-react/WalkLineIcon"
import RidingLineIcon from "remixicon-react/RidingLineIcon"
import Restaurant2LineIcon from "remixicon-react/Restaurant2LineIcon"
import SuitcaseLineIcon from "remixicon-react/SuitcaseLineIcon"
import Movie2LineIcon from "remixicon-react/Movie2LineIcon"
import Music2LineIcon from "remixicon-react/Music2LineIcon"
import AppsLineIcon from "remixicon-react/AppsLineIcon"
import StarLineIcon from "remixicon-react/StarLineIcon"
import Settings3LineIcon from "remixicon-react/Settings3LineIcon"
import GroupLineIcon from "remixicon-react/GroupLineIcon"
import BearSmileLineIcon from "remixicon-react/BearSmileLineIcon"
import Cake2LineIcon from "remixicon-react/Cake2LineIcon"
import BasketballLineIcon from "remixicon-react/BasketballLineIcon"
import LightbulbLineIcon from "remixicon-react/LightbulbLineIcon"
import TShirtLineIcon from "remixicon-react/TShirtLineIcon"
import PlantLineIcon from "remixicon-react/PlantLineIcon"
import Home3LineIcon from "remixicon-react/Home3LineIcon"
import PhoneLineIcon from "remixicon-react/PhoneLineIcon"
import TvLineIcon from "remixicon-react/TvLineIcon"
import BankCardLineIcon from "remixicon-react/BankCardLineIcon"
import { RemixiconReactIconComponentType } from "remixicon-react"

export function getIconByName(name: string) {
  return icons[name]
}

// add more Icons, liek paypal, amazon etc

export const icons: { [key: string]: RemixiconReactIconComponentType } = {
  anchor: AnchorLineIcon,
  earth: EarthLineIcon,
  rocket: RocketLineIcon,
  car: CarLineIcon,
  train: TrainLineIcon,
  flight: FlightTakeoffLineIcon,
  walk: WalkLineIcon,
  riding: RidingLineIcon,
  restaurant: Restaurant2LineIcon,
  suitcase: SuitcaseLineIcon,
  movie: Movie2LineIcon,
  music: Music2LineIcon,
  apps: AppsLineIcon,
  star: StarLineIcon,
  settings: Settings3LineIcon,
  group: GroupLineIcon,
  bearsmile: BearSmileLineIcon,
  cake: Cake2LineIcon,
  basketball: BasketballLineIcon,
  lightbulb: LightbulbLineIcon,
  tshirt: TShirtLineIcon,
  plant: PlantLineIcon,
  home: Home3LineIcon,
  phone: PhoneLineIcon,
  tv: TvLineIcon,
  bankcard: BankCardLineIcon,
}
