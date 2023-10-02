import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Stack,
  Button,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { FormCard } from "./FormCard";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { forthFormSchema } from "../model/schemas/forthFormSchema";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectAction } from "..";

interface ForthFormStepProps {
  onChangeScreen: (index: number) => void;
}
export const ForthFormStep: FC<ForthFormStepProps> = (props) => {
  const { onChangeScreen } = props;

  const dispatch = useAppDispatch();
  const {
    equipment: equipmentStore,
    facilities: facilitiesStore,
    indoorRelaxation: indoorRelaxationStore,
    infrastructureandLeisureNearby: infrastructureandLeisureNearbyStore,
    kitchenEquipment: kitchenEquipmentStore,
    windowView: windowViewStore,
    yardEquipment: yardEquipmentStore,
    forChildren: forChildrenStore,
  } = useAppSelector(
    (state) =>
      state.addOBject.forms.filter(
        (form) => form.screen == 4 && form.step == 0
      )[0].data
  ) as Yup.InferType<typeof forthFormSchema>;

  const [facilities, setFacilities] = useState<string[]>(facilitiesStore || []);
  const [windowView, setWindowView] = useState<string[]>(windowViewStore || []);
  const [kitchenEquipment, setKitchenEquipment] = useState<string[]>(
    kitchenEquipmentStore || []
  );
  const [equipment, setEquipment] = useState<string[]>(equipmentStore || []);
  const [indoorRelaxation, setIndoorRelaxation] = useState<string[]>(
    indoorRelaxationStore || []
  );
  const [yardEquipment, setYardEquipment] = useState<string[]>(
    yardEquipmentStore || []
  );
  const [infrastructureandLeisureNearby, setInfrastructureandLeisureNearby] =
    useState<string[]>(infrastructureandLeisureNearbyStore || []);

  const [forChildren, setForChildren] = useState<string[]>(
    forChildrenStore || []
  );
  const { isOpen: kitchenEquipmentIsOpen, onToggle: kitchenEquipmentOnToggle } =
    useDisclosure({ defaultIsOpen: kitchenEquipment.length > 0 });
  const { isOpen: equipmentIsOpen, onToggle: equipmentOnToggle } =
    useDisclosure({ defaultIsOpen: equipment.length > 0 });
  const { isOpen: indoorRelaxationIsOpen, onToggle: indoorRelaxationOnToggle } =
    useDisclosure({ defaultIsOpen: indoorRelaxation.length > 0 });
  const { isOpen: yardEquipmentIsOpen, onToggle: yardEquipmentOnToggle } =
    useDisclosure({ defaultIsOpen: yardEquipment.length > 0 });
  const { isOpen: forChildrenIsOpen, onToggle: forChildrenOnToggle } =
    useDisclosure({ defaultIsOpen: forChildren.length > 0 });
  const {
    isOpen: infrastructureandLeisureNearbyIsOpen,
    onToggle: infrastructureandLeisureNearbyOnToggle,
  } = useDisclosure({ defaultIsOpen: kitchenEquipment.length > 0 });
  const onCheckboxChange = (
    option: string,
    state: string[],
    setState: Dispatch<SetStateAction<string[]>>
  ) => {
    if (state.includes(option)) {
      return setState(state.filter((item) => item != option));
    }
    setState([...state, option]);
  };

  const onSubmit = (data: Yup.InferType<typeof forthFormSchema>) => {
    dispatch(
      addObjectAction.setForm({
        data,
        screen: 4,
        step: 0,
      })
    );

    onChangeScreen(5);
  };

  const onPrev = () => {
    onChangeScreen(3);
  };

  return (
    <Box
      as="form"
      onSubmit={(e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        onSubmit({
          facilities,
          windowView,
          kitchenEquipment,
          equipment,
          indoorRelaxation,
          yardEquipment,
          infrastructureandLeisureNearby,
          forChildren,
        });
      }}
    >
      <Stack>
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
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("balcony", facilities, setFacilities)
                  }
                  isChecked={facilities.includes("balcony")}
                >
                  балкон
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("Wi-Fi", facilities, setFacilities)
                  }
                  isChecked={facilities.includes("Wi-Fi")}
                >
                  беспроводной интернет Wi-Fi
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange(
                      "airConditioner",
                      facilities,
                      setFacilities
                    )
                  }
                  isChecked={facilities.includes("airConditioner")}
                >
                  кондиционер
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("towels", facilities, setFacilities)
                  }
                  isChecked={facilities.includes("towels")}
                >
                  полотенца
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("bedSheets", facilities, setFacilities)
                  }
                  isChecked={facilities.includes("bedSheets")}
                >
                  постельное бельё
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("selfIsolation", facilities, setFacilities)
                  }
                  isChecked={facilities.includes("selfIsolation")}
                >
                  самоизоляция разрешена
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("microwave", facilities, setFacilities)
                  }
                  isChecked={facilities.includes("microwave")}
                >
                  СВЧ-печь
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("TV", facilities, setFacilities)
                  }
                  isChecked={facilities.includes("TV")}
                >
                  телевизор
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("hairdryer", facilities, setFacilities)
                  }
                  isChecked={facilities.includes("hairdryer")}
                >
                  фен
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange(
                      "electricKettle",
                      facilities,
                      setFacilities
                    )
                  }
                  isChecked={facilities.includes("electricKettle")}
                >
                  электрический чайник
                </Checkbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Вид из окон</FormLabel>
              <FormHelperText>
                Укажите, что можно увидеть из окон вашего объекта. В разделе
                «Фото» загрузите фотографии всех видов, которые вы отметили
              </FormHelperText>
              <HStack flexWrap={"wrap"} mt={4}>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("sea", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("sea")}
                >
                  на море
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("city", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("city")}
                >
                  на город
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("lake", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("lake")}
                >
                  на озеро
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("park", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("park")}
                >
                  на парк
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("yard", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("yard")}
                >
                  во двор
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("attraction", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("attraction")}
                >
                  на достопримечательность
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("mountains", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("mountains")}
                >
                  на горы
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("river", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("river")}
                >
                  на реку
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("forest", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("forest")}
                >
                  на лес
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("outside", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("outside")}
                >
                  на улицу
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("pool", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("pool")}
                >
                  на бассейн
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() =>
                    onCheckboxChange("garden", windowView, setWindowView)
                  }
                  isChecked={windowView.includes("garden")}
                >
                  на сад
                </Checkbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Кухонное оборудование</FormLabel>

              <Button
                onClick={kitchenEquipmentOnToggle}
                colorScheme="red"
                variant="link"
              >
                {!kitchenEquipmentIsOpen
                  ? " развернуть список"
                  : "свернуть список"}
              </Button>
              <Collapse in={kitchenEquipmentIsOpen} animateOpacity>
                <HStack flexWrap={"wrap"} mt={4}>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "barCounter",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("barCounter")}
                  >
                    барная стойка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "gasStove",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("gasStove")}
                  >
                    газовая плита
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "coffeeMaker",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("coffeeMaker")}
                  >
                    кофеварка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "kitchenSet",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("kitchenSet")}
                  >
                    кухонный гарнитур
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "freezer",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("freezer")}
                  >
                    морозильник
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "dinnerTable",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("dinnerTable")}
                  >
                    обеденный стол
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "dishwasher",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("dishwasher")}
                  >
                    посудомоечная машина
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "cutlery",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("cutlery")}
                  >
                    столовые приборы
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "turkForMakingCoffee",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("turkForMakingCoffee")}
                  >
                    турка для приготовления кофе
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "fridge",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("fridge")}
                  >
                    холодильник
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "electricStove",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("electricStove")}
                  >
                    электроплита
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "blender",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("blender")}
                  >
                    блендер
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "oven",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("oven")}
                  >
                    духовка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "coffeeMachine",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("coffeeMachine")}
                  >
                    кофемашина
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "miniBar",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("miniBar")}
                  >
                    мини-бар
                  </Checkbox>

                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "multicooker",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("multicooker")}
                  >
                    мультиварка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "dishesAndAccessories",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes(
                      "dishesAndAccessories"
                    )}
                  >
                    осуда и принадлежности
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "microwave",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("microwave")}
                  >
                    СВЧ-печь
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "toaster",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("toaster")}
                  >
                    тостер
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "waterFilter",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("waterFilter")}
                  >
                    фильтр для воды
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "electricKettle",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("electricKettle")}
                  >
                    электрический чайник
                  </Checkbox>
                </HStack>
              </Collapse>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Оснащение</FormLabel>

              <Button
                onClick={equipmentOnToggle}
                colorScheme="red"
                variant="link"
              >
                {!equipmentIsOpen ? " развернуть список" : "свернуть список"}
              </Button>
              <Collapse in={equipmentIsOpen} animateOpacity>
                <HStack flexWrap={"wrap"} mt={4}>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("balcony", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("balcony")}
                  >
                    балкон
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("Wi-Fi", equipment, setEquipment)
                    }
                    isChecked={kitchenEquipment.includes("Wi-Fi")}
                  >
                    беспроводной интернет Wi-Fi
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "coffeeMaker",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("coffeeMaker")}
                  >
                    кофеварка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("clothesHanger", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("clothesHanger")}
                  >
                    вешалка для одежды
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "gasWaterHeater",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("gasWaterHeater")}
                  >
                    газовый водонагреватель
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("seatingAre", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("seatingAre")}
                  >
                    гостиный уголок
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("jacuzzi", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("jacuzzi")}
                  >
                    джакузи (гидромассажная ванна)
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("sofaBed", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("sofaBed")}
                  >
                    диван-кровать
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("coffeeTable", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("coffeeTable")}
                  >
                    журнальный столик
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("fireplace", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("fireplace")}
                  >
                    камин
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "airConditioner",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("airConditioner")}
                  >
                    кондиционер
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("linoleum", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("linoleum")}
                  >
                    линолеум
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("steelDoor", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("steelDoor")}
                  >
                    металлическая дверь
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("heater", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("heater")}
                  >
                    обогреватель
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "personalComputer",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("personalComputer")}
                  >
                    персональный компьютер
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("beachTowels", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("beachTowels")}
                  >
                    пляжные полотенца
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("vacuumCleaner", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("vacuumCleaner")}
                  >
                    пылесос
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("foldingBed", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("foldingBed")}
                  >
                    раскладная кровать
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "washingmMachine",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("washingmMachine")}
                  >
                    стиральная машина
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("dryer", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("dryer")}
                  >
                    сушильная машина
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "ironWithIroningBoard",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("ironWithIroningBoard")}
                  >
                    утюг с гладильной доской
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("cleaners", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("cleaners")}
                  >
                    чистящие средства
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "blackoutCurtains",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("blackoutCurtains")}
                  >
                    шторы блэкаут
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("pool", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("pool")}
                  >
                    бассейн
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("fan", equipment, setEquipment)
                    }
                    isChecked={kitchenEquipment.includes("fan")}
                  >
                    вентилятор
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "waterHeater",
                        kitchenEquipment,
                        setKitchenEquipment
                      )
                    }
                    isChecked={kitchenEquipment.includes("waterHeater")}
                  >
                    водонагреватель
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("wardrobe", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("wardrobe")}
                  >
                    гардеробная
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "woodParquetFloor",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("woodParquetFloor")}
                  >
                    деревянный/паркетный пол
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("sofa", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("sofa")}
                  >
                    диван
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("intercom", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("intercom")}
                  >
                    домофон
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("soundproofing", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("soundproofing")}
                  >
                    звукоизоляция
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "carpetCovering",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("carpetCovering")}
                  >
                    ковровое покрытие
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("laminate", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("laminate")}
                  >
                    ламинат
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "skiSnowboardStorage",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("skiSnowboardStorage")}
                  >
                    место для хранения лыж / сноуборда
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("mosquitoNet", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("mosquitoNet")}
                  >
                    москитная сетка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "electricHeatedBlankets",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("electricHeatedBlankets")}
                  >
                    одеяла с электроподогревом
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "tileMarbleFloor",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("tileMarbleFloor")}
                  >
                    плиточный/мраморный пол
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("wiredInternet", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("wiredInternet")}
                  >
                    проводной интернет
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("desktop", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("desktop")}
                  >
                    рабочий стол
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("safe", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("safe")}
                  >
                    сейф
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("clothesDryer", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("clothesDryer")}
                  >
                    сушилка для белья
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("telephone", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("telephone")}
                  >
                    телефон
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "centralHeating",
                        equipment,
                        setEquipment
                      )
                    }
                    isChecked={equipment.includes("centralHeating")}
                  >
                    центральное отопление
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("closet", equipment, setEquipment)
                    }
                    isChecked={equipment.includes("closet")}
                  >
                    шкаф
                  </Checkbox>
                </HStack>
              </Collapse>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Для отдыха в помещении</FormLabel>

              <Button
                onClick={indoorRelaxationOnToggle}
                colorScheme="red"
                variant="link"
              >
                {!indoorRelaxationIsOpen
                  ? " развернуть список"
                  : "свернуть список"}
              </Button>
              <Collapse in={indoorRelaxationIsOpen} animateOpacity>
                <HStack flexWrap={"wrap"} mt={4}>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "billiards",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("billiards")}
                  >
                    бильярд
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "cableTV",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("cableTV")}
                  >
                    кабельное ТВ
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "musicCenter",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("musicCenter")}
                  >
                    музыкальный центр
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "tableTennis",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("tableTennis")}
                  >
                    настольный теннис
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "payTVchannels",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("payTVchannels")}
                  >
                    платные ТВ-каналы
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "smartTV",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("smartTV")}
                  >
                    смарт ТВ
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "TV",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("TV")}
                  >
                    телевизор
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "gameConsole",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("gameConsole")}
                  >
                    игровая консоль
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "books",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("books")}
                  >
                    книги
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "boardGames",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("boardGames")}
                  >
                    настольные игры
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "laptop",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("laptop")}
                  >
                    ноутбук
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "radio",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("radio")}
                  >
                    радио
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "satelliteTV",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("satelliteTV")}
                  >
                    спутниковое ТВ
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "terrestrialTV",
                        indoorRelaxation,
                        setIndoorRelaxation
                      )
                    }
                    isChecked={indoorRelaxation.includes("terrestrialTV")}
                  >
                    эфирное ТВ
                  </Checkbox>
                </HStack>
              </Collapse>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Оснащение двора</FormLabel>

              <Button
                onClick={yardEquipmentOnToggle}
                colorScheme="red"
                variant="link"
              >
                {!yardEquipmentIsOpen
                  ? " развернуть список"
                  : "свернуть список"}
              </Button>
              <Collapse in={yardEquipmentIsOpen} animateOpacity>
                <HStack flexWrap={"wrap"} mt={4}>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "bathhouse",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("bathhouse")}
                  >
                    баня (на территории)
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "alcove",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("alcove")}
                  >
                    беседка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "hammock",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("hammock")}
                  >
                    гамак
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "babySwing",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("babySwing")}
                  >
                    детские качели
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("boat", yardEquipment, setYardEquipment)
                    }
                    isChecked={yardEquipment.includes("boat")}
                  >
                    лодка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "outdoorDiningArea",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("outdoorDiningArea")}
                  >
                    обеденная зона на улице
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "protectedArea",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("protectedArea")}
                  >
                    охраняемая территория
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("patio", yardEquipment, setYardEquipment)
                    }
                    isChecked={yardEquipment.includes("patio")}
                  >
                    патио
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "barbecueSupplies",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("barbecueSupplies")}
                  >
                    принадлежности для барбекю
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("gym", yardEquipment, setYardEquipment)
                    }
                    isChecked={yardEquipment.includes("gym")}
                  >
                    спортивный зал
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "footballField",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("footballField")}
                  >
                    футбольное поле
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "barbecueGrill",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("barbecueGrill")}
                  >
                    барбекю/мангал
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "veranda",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("veranda")}
                  >
                    веранда
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "garage",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("garage")}
                  >
                    гараж
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "playground",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("playground")}
                  >
                    игровая площадка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "outdoorFurniture",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("outdoorFurniture")}
                  >
                    мебель на улице
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "openPool",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("openPool")}
                  >
                    открытый бассейн
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "parking",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("parking")}
                  >
                    парковка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "beachUmbrella",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("beachUmbrella")}
                  >
                    пляжный зонтик
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "gardenFurniture",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("gardenFurniture")}
                  >
                    садовая мебель
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "terrace",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("terrace")}
                  >
                    терраса
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "sunLoungers",
                        yardEquipment,
                        setYardEquipment
                      )
                    }
                    isChecked={yardEquipment.includes("sunLoungers")}
                  >
                    шезлонги
                  </Checkbox>
                </HStack>
              </Collapse>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>
                Инфраструктура и досуг рядом
              </FormLabel>

              <Button
                onClick={infrastructureandLeisureNearbyOnToggle}
                colorScheme="red"
                variant="link"
              >
                {!infrastructureandLeisureNearbyIsOpen
                  ? " развернуть список"
                  : "свернуть список"}
              </Button>
              <Collapse
                in={infrastructureandLeisureNearbyIsOpen}
                animateOpacity
              >
                <HStack flexWrap={"wrap"} mt={4}>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "SPACenter",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "SPACenter"
                    )}
                  >
                    SPA-центр
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "bathhouse",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "bathhouse"
                    )}
                  >
                    баня (за территорией)
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "bowling",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "bowling"
                    )}
                  >
                    боулинг
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "waterSports",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "waterSports"
                    )}
                  >
                    водные виды спорта
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "skiing",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "skiing"
                    )}
                  >
                    горные лыжи
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "housingIsInThePrivateSector",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "housingIsInThePrivateSector"
                    )}
                  >
                    жильё находится в частном секторе
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "iceRink",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "iceRink"
                    )}
                  >
                    каток
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "forest",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "forest"
                    )}
                  >
                    лес
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "hunting",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "hunting"
                    )}
                  >
                    охота
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "bicyclesForRent",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "bicyclesForRent"
                    )}
                  >
                    прокат велосипедов
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "pondLakeNearby",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "pondLakeNearby"
                    )}
                  >
                    пруд/озеро поблизости
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "theater",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "theater"
                    )}
                  >
                    театр
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "yachtClub",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "yachtClub"
                    )}
                  >
                    яхтклуб
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "mountaineering",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "mountaineering"
                    )}
                  >
                    альпинизм
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "billiardClub",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "billiardClub"
                    )}
                  >
                    бильярдный клуб
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "horsebackRiding",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "horsebackRiding"
                    )}
                  >
                    верховая езда
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "golf",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes("golf")}
                  >
                    гольф
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "snowmobiling",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "snowmobiling"
                    )}
                  >
                    езда на снегоходах
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "zoo",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes("zoo")}
                  >
                    зоопарк
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "cinema",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "cinema"
                    )}
                  >
                    кинотеатр
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "nightClub",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "nightClub"
                    )}
                  >
                    ночной клуб
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "amusementPark",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "amusementPark"
                    )}
                  >
                    парк аттракционов
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "rollerSkateRental",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "rollerSkateRental"
                    )}
                  >
                    прокат роликовых коньков
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "fishing",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "fishing"
                    )}
                  >
                    рыбалка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "tennisCourt",
                        infrastructureandLeisureNearby,
                        setInfrastructureandLeisureNearby
                      )
                    }
                    isChecked={infrastructureandLeisureNearby.includes(
                      "tennisCourt"
                    )}
                  >
                    теннисный корт
                  </Checkbox>
                </HStack>
              </Collapse>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xl"}>Для детей</FormLabel>

              <Button
                onClick={forChildrenOnToggle}
                colorScheme="red"
                variant="link"
              >
                {!forChildrenIsOpen ? " развернуть список" : "свернуть список"}
              </Button>
              <Collapse in={forChildrenIsOpen} animateOpacity>
                <HStack flexWrap={"wrap"} mt={4}>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "highChairForChild",
                        forChildren,
                        setForChildren
                      )
                    }
                    isChecked={forChildren.includes("highChairForChild")}
                  >
                    высокий стул для ребенка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "childrenPotty",
                        forChildren,
                        setForChildren
                      )
                    }
                    isChecked={forChildren.includes("childrenPotty")}
                  >
                    детский горшок
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "protectiveCoversOnSockets",
                        forChildren,
                        setForChildren
                      )
                    }
                    isChecked={forChildren.includes(
                      "protectiveCoversOnSockets"
                    )}
                  >
                    защитные крышки на розетках
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "playpenBed",
                        forChildren,
                        setForChildren
                      )
                    }
                    isChecked={forChildren.includes("playpenBed")}
                  >
                    кровать-манеж
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "chairForBabies",
                        forChildren,
                        setForChildren
                      )
                    }
                    isChecked={forChildren.includes("chairForBabies")}
                  >
                    стульчик для кормления
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange("crib", forChildren, setForChildren)
                    }
                    isChecked={forChildren.includes("crib")}
                  >
                    детская кроватка
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "windowProtection",
                        forChildren,
                        setForChildren
                      )
                    }
                    isChecked={forChildren.includes("windowProtection")}
                  >
                    защита на окнах
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "gamesToysForChildren",
                        forChildren,
                        setForChildren
                      )
                    }
                    isChecked={forChildren.includes("gamesToysForChildren")}
                  >
                    игры/игрушки для детей
                  </Checkbox>
                  <Checkbox
                    colorScheme="red"
                    minW="49%"
                    onChange={() =>
                      onCheckboxChange(
                        "changingTable",
                        forChildren,
                        setForChildren
                      )
                    }
                    isChecked={forChildren.includes("changingTable")}
                  >
                    пеленальный стол
                  </Checkbox>
                </HStack>
              </Collapse>
            </FormControl>
          </Stack>
        </FormCard>
        <FormCard>
          <HStack justifyContent={"space-between"}>
            <Button onClick={onPrev} colorScheme="gray" variant={"outline"}>
              Назад
            </Button>
            <Button type="submit" colorScheme="red">
              Продолжить
            </Button>
          </HStack>
        </FormCard>
      </Stack>
    </Box>
  );
};
