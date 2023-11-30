import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Stack,
} from "@chakra-ui/react";
import {
  FacilitiesType,
  facilitiesFormSchema,
} from "@entites/Object/model/schemas/facilitiesFormSchema";

import { FormContainer } from "@entites/Object/ui/FormContainer";

import { CollapseCheckbox } from "@entites/Object/ui/CallapseCheckbox";
import { ControlCheckbox } from "@entites/Object/ui/ControlCheckbox";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCard } from "@shared/ui/FormCard";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormProps } from "@entites/Object/model/types/objectTypes";
interface FacilitiesFormProps {
  value: FacilitiesType;
  onChange: (value: FacilitiesType) => void;
}

const FacilitiesForm: FC<FormProps & FacilitiesFormProps> = (props) => {
  const { navigation, onNext, onChange, value } = props;

  const { control, handleSubmit } = useForm<FacilitiesType>({
    resolver: yupResolver(facilitiesFormSchema),
    defaultValues: { ...value },
  });

  const onSubmit: SubmitHandler<FacilitiesType> = (data) => {
    onChange(data);
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard>
          <Stack spacing={6}>
            <FormControl>
              <FormLabel fontSize={"xl"}>Удобства</FormLabel>
              <FormHelperText>
                Популярные услуги и удобства, на которые чаще всего обращают
                внимание гости при поиске жилья. После публикации можно добавить
                другие
              </FormHelperText>
              <HStack flexWrap={"wrap"} mt={4}>
                <ControlCheckbox
                  control={control}
                  name={"roomAmenities.airConditioner"}
                >
                  кондиционер
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomAmenities.balcony"}
                >
                  балкон
                </ControlCheckbox>

                <ControlCheckbox control={control} name={"roomAmenities.bath"}>
                  ванна
                </ControlCheckbox>

                <ControlCheckbox
                  control={control}
                  name={"roomAmenities.toiletries"}
                >
                  туалетные принадлежности
                </ControlCheckbox>
                <ControlCheckbox control={control} name={"roomAmenities.safe"}>
                  сейф
                </ControlCheckbox>
                <ControlCheckbox control={control} name={"roomAmenities.tv"}>
                  телевизор
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomAmenities.electricKettle"}
                >
                  электрический чайник
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomAmenities.hairDryer"}
                >
                  фен
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomAmenities.jacuzzi"}
                >
                  джакузи
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomAmenities.microwave"}
                >
                  СВЧ-печь
                </ControlCheckbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Доступность</FormLabel>

              <HStack flexWrap={"wrap"} mt={4}>
                <ControlCheckbox
                  control={control}
                  name="roomAvailability.contactlessCheckinPossible"
                >
                  возможно бесконтактное заселение
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomAvailability.disabledAccess"
                >
                  доступ для инвалидов
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomAvailability.elevator"
                >
                  лифт
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomAvailability.locatedOnTheFirstFloor"
                >
                  находится на первом этаже
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomAvailability.toiletWithGrabBars"
                >
                  туалет с поручнями
                </ControlCheckbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Вид из окон</FormLabel>
              <FormHelperText>
                Укажите, что можно увидеть из окон вашего объекта. В разделе
                «Фото» загрузите фотографии всех видов, которые вы отметили
              </FormHelperText>
              <HStack flexWrap={"wrap"} mt={4}>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.onTheSea"}
                >
                  на море
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.toTheMountains"}
                >
                  на горы
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.toTheCity"}
                >
                  на город
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.toTheLake"}
                >
                  на реку
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.toTheRiver"}
                >
                  на озеро
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.toTheForest"}
                >
                  на лес
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.toThePark"}
                >
                  на парк
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.outside"}
                >
                  на улицу
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.intoTheYard"}
                >
                  на улицу
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.toThePool"}
                >
                  на бассейн
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.toTheAttraction"}
                >
                  на достопримечательность
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomViewFromWindow.toTheGarden"}
                >
                  на сад
                </ControlCheckbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Кухонное оборудование</FormLabel>

              <CollapseCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.barCounter"}
                >
                  барная стойка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.blender"}
                >
                  блендер
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.gasStove"}
                >
                  газовая плита
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.oven"}
                >
                  духовка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.coffeeMaker"}
                >
                  кофеварка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.coffeeMachine"}
                >
                  кофемашина
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.kitchenSet"}
                >
                  кухонный гарнитур
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.microwave"}
                >
                  СВЧ-печь
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.miniBar"}
                >
                  мини-бар
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.freezer"}
                >
                  морозильник
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.multicooker"}
                >
                  мультиварка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.dinnerTable"}
                >
                  обеденный стол
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.dishesAndAccessories"}
                >
                  посуда и принадлежности
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.dishwasher"}
                >
                  посудомоечная машина
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.cutlery"}
                >
                  столовые приборы
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.toaster"}
                >
                  тостер
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.turkForMakingCoffee"}
                >
                  турка для приготовления кофе
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.waterFilter"}
                >
                  фильтр для воды
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.fridge"}
                >
                  холодильник
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.electricKettle"}
                >
                  электрический чайник
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name={"roomKitchenEquipment.electricStove"}
                >
                  электроплита
                </ControlCheckbox>
              </CollapseCheckbox>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Оснащение</FormLabel>

              <CollapseCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.balcony">
                  балкон
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.wirelessInternetWiFi"
                >
                  беспроводной интернет Wi-Fi
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.fan">
                  вентилятор
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.pool">
                  бассейн
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.waterHeater"
                >
                  водонагреватель
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.gasWaterHeater"
                >
                  газовый водонагреватель
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.wardrobe"
                >
                  гардеробная
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.seatingArea"
                >
                  гостиный уголок
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.woodParquetFloor"
                >
                  деревянный/паркетный пол
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.jacuzzi">
                  джакузи
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.intercom"
                >
                  домофон
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.soundproofing"
                >
                  звукоизоляция
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.fireplace"
                >
                  камин
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.carpetCovering"
                >
                  ковровое покрытие
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.airConditioner"
                >
                  кондиционер
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.steelDoor"
                >
                  металлическая дверь
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.mosquitoNet"
                >
                  москитная сетка
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.heater">
                  обогреватель
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.electricHeatedBlankets"
                >
                  одеяла с электроподогревом
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.personalComputer"
                >
                  персональный компьютер
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.tileMarbleFloor"
                >
                  плиточный/мраморный пол
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.wiredInternet"
                >
                  проводной интернет
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.desktop">
                  рабочий стол
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.foldingBed"
                >
                  раскладная кровать
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.safe">
                  сейф
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.washingMachine"
                >
                  стиральная машина
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.clothesDryer"
                >
                  сушилка для белья
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.dryer">
                  сушильная машина
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.telephone"
                >
                  телефон
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.ironWithIroningBoard"
                >
                  утюг с гладильной доской
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.centralHeating"
                >
                  центральное отопление
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.cleaners"
                >
                  чистящие средства
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.closet">
                  шкаф
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.attic">
                  Мансарда
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.laminate"
                >
                  ламинат
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.linoleum"
                >
                  Линолеум
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.coffeeTable"
                >
                  журнальный столик
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.vacuumCleaner"
                >
                  пылесос
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.clothesHanger"
                >
                  вешалка для одежды
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.beachTowels"
                >
                  пляжные полотенца
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.skiSnowboardStorage"
                >
                  место для хранения лыж / сноуборда
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomEquipment.blackoutCurtains"
                >
                  шторы блэкаут
                </ControlCheckbox>

                <ControlCheckbox control={control} name="roomEquipment.sofa">
                  диван
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomEquipment.sofaBed">
                  диван-кровать
                </ControlCheckbox>
              </CollapseCheckbox>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Для отдыха в помещении</FormLabel>

              <CollapseCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.billiards"
                >
                  бильярд
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.gameConsole"
                >
                  игровая консоль
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.cableTV"
                >
                  кабельное ТВ
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.books"
                >
                  книги
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.musicCenter"
                >
                  музыкальный центр
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.boardGames"
                >
                  настольные игры
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.tableTennis"
                >
                  настольный теннис
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.laptop"
                >
                  ноутбук
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.radio"
                >
                  радио
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.satelliteTV"
                >
                  спутниковое ТВ
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.tv"
                >
                  телевизор
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.terrestrialTV"
                >
                  эфирное ТВ
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.payTVChannels"
                >
                  платные ТВ-каналы
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomIndoorRelaxation.smartTV"
                >
                  смарт ТВ
                </ControlCheckbox>
              </CollapseCheckbox>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Оснащение двора</FormLabel>

              <CollapseCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.bathhouseOnSide"
                >
                  баня (на территории)
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.alcove"
                >
                  беседка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.veranda"
                >
                  веранда
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.hammock"
                >
                  гамак
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.garage"
                >
                  гараж
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.babySwing"
                >
                  детские качели
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.playground"
                >
                  игровая площадка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.boat"
                >
                  лодка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.barbecueGrill"
                >
                  барбекю/мангал
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.outdoorFurniture"
                >
                  мебель на улице
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.outdoorDiningArea"
                >
                  обеденная зона на улице
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.protectedArea"
                >
                  охраняемая территория
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.parking"
                >
                  парковка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.patio"
                >
                  патио
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.beachUmbrella"
                >
                  пляжный зонтик
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.barbecueSupplies"
                >
                  принадлежности для барбекю
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.gardenFurniture"
                >
                  садовая мебель
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.gym"
                >
                  спортивный зал
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.terrace"
                >
                  терраса
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.footballField"
                >
                  футбольное поле
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomOutsideRelaxation.sunLoungers"
                >
                  шезлонги
                </ControlCheckbox>
              </CollapseCheckbox>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>
                Инфраструктура и досуг рядом
              </FormLabel>

              <CollapseCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.spaCenter"
                >
                  SPA-центр
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.mountaineering"
                >
                  альпинизм
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.bathhouseOffSite"
                >
                  баня (за территорией)
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.billiardClub"
                >
                  бильярдный клуб
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.bowling"
                >
                  боулинг
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.horsebackRiding"
                >
                  верховая езда
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.waterSports"
                >
                  водные виды спорта
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.golf"
                >
                  гольф
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.skiing"
                >
                  горные лыжи
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.snowmobiling"
                >
                  езда на снегоходах
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.housingIsInPrivateSector"
                >
                  жильё находится в частном секторе
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.zoo"
                >
                  зоопарк
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.iceRink"
                >
                  каток
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.cinema"
                >
                  кинотеатр
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.forest"
                >
                  лес
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.nightClub"
                >
                  ночной клуб
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.hunting"
                >
                  охота
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.amusementPark"
                >
                  парк аттракционов
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.bicyclesForRent"
                >
                  прокат велосипедов
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.rollerSkateRental"
                >
                  прокат роликовых коньков
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.pondLakeNearby"
                >
                  пруд/озеро поблизости
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.fishing"
                >
                  рыбалка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.theater"
                >
                  театр
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.tennisCourt"
                >
                  теннисный корт
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomInfrastructureLeisureNearby.yachtClub"
                >
                  яхтклуб
                </ControlCheckbox>
              </CollapseCheckbox>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Для детей</FormLabel>

              <CollapseCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomForChildren.highChairForChild"
                >
                  высокий стул для ребенка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomForChildren.childrensPotty"
                >
                  детский горшок
                </ControlCheckbox>
                <ControlCheckbox control={control} name="roomForChildren.crib">
                  детская кроватка
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomForChildren.windowProtection"
                >
                  защита на окнах
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomForChildren.gamesToysForChildren"
                >
                  игры/игрушки для детей
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomForChildren.playpenBed"
                >
                  кровать-манеж
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomForChildren.changingTable"
                >
                  пеленальный стол
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomForChildren.chairForBabies"
                >
                  стульчик для кормления
                </ControlCheckbox>
                <ControlCheckbox
                  control={control}
                  name="roomForChildren.protectiveCoversOnSockets"
                >
                  защитные крышки на розетках
                </ControlCheckbox>
              </CollapseCheckbox>
            </FormControl>
          </Stack>
        </FormCard>
        {navigation}
      </FormContainer>
    </Box>
  );
};

export default FacilitiesForm;
