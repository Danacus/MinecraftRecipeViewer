import Plugin from '../api/plugin'

const context = {
  mods: {
    abyssalcraft: {
      CreationRitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      Crystallizer: {
        addCrystallization: () => {},
        addSingleCrystallization: () => {},
        removeCrystallization: () => {}
      },
      EnchantmentRitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      InfusionRitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      necronomicon: {
        internal: {
          addChapter: () => {},
          removeChapter: () => {},
          addNormalPage: () => {},
          addItemPage: () => {},
          addImagePage: () => {},
          addCraftingPage: () => {},
          addURLPage: () => {},
          removePage: () => {}
        }
      },
      PotionAoERitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      PotionRitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      shoggoth: {
        addShoggothFood: () => {}
      },
      Transmutator: {
        addTransmutation: () => {},
        removeTransmutation: () => {}
      },
      UpgradeKit: {
        addUpgrade: () => {},
        removeUpgrade: () => {}
      }
    },
    armoreablemobs: {
      ArmorGroup: {
        addEntity: () => {},
        addArmor: () => {},
        addGameStage: () => {}
      }
    },
    astralsorcery: {
      Altar: {
        removeAltarRecipe: () => {},
        addDiscoveryAltarRecipe: () => {},
        addAttunmentAltarRecipe: () => {},
        addConstellationAltarRecipe: () => {}
      },
      StarlightInfusion: {
        addInfusion: () => {},
        removeInfusion: () => {}
      },
      LightTransmutation: {
        addTransmutation: () => {},
        removeTransmutation: () => {}
      },
      RitualMineralis: {
        addOre: () => {},
        removeOre: () => {}
      },
      Lightwell: {
        removeLiquefaction: () => {},
        addLiquefaction: () => {}
      }
    },
    BadMobs: {
      blacklist: () => {}
    },
    caravans: {
      Entity: {
        setEntityClassPath: () => {},
        setCustomInfo: () => {}
      }
    },
    contenttweaker: {
      Item: {
        setUnlocalizedName: () => {},
        setMaxStackSize: () => {},
        setRarity: () => {},
        setCreativeTab: () => {},
        setSmeltingExperience: () => {},
        setToolClass: () => {},
        setToolLevel: () => {},
        setBeaconPayment: () => {},
        setItemRightClick: () => {},
        setItemUseAction: () => {},
        setGlowing: () => {},
        setOnItemUse: () => {},
        setMaxDamage: () => {},
        register: () => {}
      },
      Block: {
        setUnlocalizedName: () => {},
        setCreativeTab: () => {},
        setFullBlock: () => {},
        setLightOpacity: () => {},
        setTranslucent: () => {},
        setLightValue: () => {},
        setBlockHardness: () => {},
        setBlockResistance: () => {},
        setToolClass: () => {},
        setToolLevel: () => {},
        setBlockSoundType: () => {},
        setBlockMaterial: () => {},
        setEnchantPowerBonus: () => {},
        setEnumBlockRenderType: () => {},
        setSlipperiness: () => {},
        setOnBlockBreak: () => {},
        setOnBlockPlace: () => {},
        setBlockLayer: () => {},
        setAxisAlignedBB: () => {},
        setOnUpdateTick: () => {},
        setOnRandomTick: () => {},
        setMobilityFlag: () => {},
        register: () => {}
      },
      Fluid: {
        setUnlocalizedName: () => {},
        setDensity: () => {},
        setGaseous: () => {},
        setLuminosity: () => {},
        setTemperature: () => {},
        setColor: () => {},
        setColorize: () => {},
        setStillLocation: () => {},
        setFlowingLocation: () => {},
        setRarity: () => {},
        setViscosity: () => {},
        setFillSound: () => {},
        setEmptySound: () => {},
        setVaporize: () => {},
        setMaterial: () => {},
        register: () => {}
      },
      CreativeTab: {
        register: () => {}
      },
      Particles: {
        createParticle: () => {},
        doFireParticles: () => {},
        doEnderChestParticles: () => {}
      },
      Commands: {
        call: () => {}
      },
      PartType: {
        setData: () => {}
      },
      MaterialPart: {
        setTextureLocation: () => {},
        setColorized: () => {}
      },
      MaterialPartData: {
        addDataValue: () => {}
      },
      MutableItemStack: {
        setCount: () => {},
        shrink: () => {},
        grow: () => {},
        damage: () => {}
      },
      AxisAlignedBB: {
        setMinX: () => {},
        setMinY: () => {},
        setMinZ: () => {},
        setMaxX: () => {},
        setMaxY: () => {},
        setMaxZ: () => {}
      }
    },
    crossroads: {
      FluidCoolingChamber: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Grindstone: {
        addRecipe: () => {},
        removeRecipe: () => {}
      }
    },
    DimensionStages: {
      addDimensionStage: () => {}
    },
    extendedcrafting: {
      CombinationCrafting: {
        addRecipe: () => {},
        remove: () => {}
      },
      CompressionCrafting: {
        addRecipe: () => {},
        remove: () => {}
      },
      TableCrafting: {
        addShaped: () => {},
        addShapeless: () => {},
        remove: () => {}
      }
    },
    gregtech: {
      AlloySmelter: {
        addRecipe: () => {}
      },
      Amplifabricator: {
        addRecipe: () => {}
      },
      ArcFurnace: {
        addRecipe: () => {}
      },
      Assembler: {
        addRecipe: () => {}
      },
      AssemblyLine: {
        addRecipe: () => {}
      },
      Autoclave: {
        addRecipe: () => {}
      },
      BlastFurnace: {
        addRecipe: () => {}
      },
      Brewery: {
        addRecipe: () => {}
      },
      Canner: {
        addRecipe: () => {}
      },
      Centrifuge: {
        addRecipe: () => {},
        addRecipeFuelCan: () => {}
      },
      ChemicalBath: {
        addRecipe: () => {}
      },
      ChemicalReactor: {
        addRecipe: () => {}
      },
      CuttingSaw: {
        addRecipe: () => {}
      },
      DistillationTower: {
        addRecipe: () => {}
      },
      Distillery: {
        addRecipe: () => {}
      },
      Electrolyzer: {
        addRecipe: () => {}
      },
      Extruder: {
        addRecipe: () => {}
      },
      Fermenter: {
        addRecipe: () => {}
      },
      FluidCanner: {
        addRecipe: () => {}
      },
      FluidExtractor: {
        addRecipe: () => {}
      },
      FluidHeater: {
        addRecipe: () => {}
      },
      FluidSolidifier: {
        addRecipe: () => {}
      },
      ForgeHammer: {
        addRecipe: () => {}
      },
      FormingPress: {
        addRecipe: () => {}
      },
      FusionReactor: {
        addRecipe: () => {}
      },
      ImplosionCompressor: {
        addRecipe: () => {}
      },
      Lathe: {
        addRecipe: () => {}
      },
      Mixer: {
        addRecipe: () => {}
      },
      OilCracker: {
        addRecipe: () => {}
      },
      Packer: {
        addRecipe: () => {}
      },
      PlasmaArcFurnace: {
        addRecipe: () => {}
      },
      PlateBender: {
        addRecipe: () => {}
      },
      Polarizer: {
        addRecipe: () => {}
      },
      PrecisionLaser: {
        addRecipe: () => {}
      },
      Printer: {
        addRecipe: () => {}
      },
      Pulverizer: {
        addRecipe: () => {}
      },
      PyrolyseOven: {
        addRecipe: () => {}
      },
      Separator: {
        addRecipe: () => {}
      },
      Sifter: {
        addRecipe: () => {}
      },
      Slicer: {
        addRecipe: () => {}
      },
      Unpacker: {
        addRecipe: () => {}
      },
      VacuumFreezer: {
        addRecipe: () => {}
      },
      Wiremill: {
        addRecipe: () => {}
      },
      Fuels: {
        addDieselFuel: () => {},
        addGasTurbineFuel: () => {},
        addThermalGeneratorFuel: () => {},
        addDenseFluidFuel: () => {},
        addPlasmaGeneratorFuel: () => {},
        addMagicGeneratorFuel: () => {}
      }
    },
    horsepower: {
      ChoppingBlock: {
        add: () => {},
        remove: () => {}
      },
      Grindstone: {
        add: () => {},
        remove: () => {}
      },
      Press: {
        add: () => {},
        remove: () => {}
      }
    },
    immersiveengineering: {
      AlloySmelter: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      ArcFurnace: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      BlastFurnace: {
        addRecipe: () => {},
        removeRecipe: () => {},
        addFuel: () => {},
        removeFuel: () => {}
      },
      Blueprint: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      BottlingMachine: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      CokeOven: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Crusher: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      DieselHandler: {
        addFuel: () => {},
        addDrillFuel: () => {},
        removeFuel: () => {},
        removeDrillFuel: () => {}
      },
      Excavator: {
        addMineral: () => {},
        removeMineral: () => {},
        addOre: () => {},
        removeOre: () => {}
      },
      Fermenter: {
        addRecipe: () => {},
        removeFluidRecipe: () => {},
        removeItemRecipe: () => {},
        removeByInput: () => {}
      },
      MetalPress: {
        addRecipe: () => {},
        removeRecipe: () => {},
        removeRecipeByMold: () => {}
      },
      Mixer: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Refinery: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Squeezer: {
        addRecipe: () => {},
        removeFluidRecipe: () => {},
        removeItemRecipe: () => {},
        removeByInput: () => {}
      }
    },
    industrialforegoing: {
      BioReactor: {
        add: () => {},
        remove: () => {}
      },
      LaserDrill: {
        add: () => {},
        remove: () => {}
      },
      SludgeRefiner: {
        add: () => {},
        remove: () => {}
      }
    },
    initialinventory: {
      InvHandler: {
        addStartingItem: () => {}
      }
    },
    ItemStages: {
      addItemStage: () => {}
    },
    ltt: {
      LootTable: {
        removeTable: () => {},
        removePool: () => {},
        removeEntry: () => {},
        removeItem: () => {},
        removeModEntry: () => {},
        removeModItem: () => {},
        removeModTable: () => {},
        removeGlobalItem: () => {}
      }
    },
    mekanism: {
      chemical: {
        crystallizer: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        dissolution: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        infuser: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        injection: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        oxidizer: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        washer: {
          addRecipe: () => {},
          removeRecipe: () => {}
        }
      },
      combiner: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      compressor: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      crusher: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      smelter: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      enrichment: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      infuser: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      purification: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      reaction: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      sawmill: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      separator: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      solarneutronactivator: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      thermalevaporation: {
        addRecipe: () => {},
        removeRecipe: () => {}
      }
    },
    MobStages: {
      addStage: () => {},
      addReplacement: () => {},
      addRange: () => {},
      toggleSpawner: () => {}
    },
    actuallyadditions: {
      AtomicReconstructor: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      BallOfFur: {
        addReturn: () => {},
        removeReturn: () => {}
      },
      Compost: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Crusher: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Empowerer: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      MiningLens: {
        addStoneOre: () => {},
        addNetherOre: () => {},
        removeStoneOre: () => {},
        removeNetherOre: () => {}
      },
      OilGen: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      TreasureChest: {
        addLoot: () => {},
        removeLoot: () => {}
      }
    },
    betterwithmods: {
      Anvil: {
        addShaped: () => {},
        addShapeless: () => {},
        removeShaped: () => {},
        removeShapeless: () => {}
      },
      Buoyancy: {
        set: () => {}
      },
      Cauldron: {
        add: () => {},
        remove: () => {}
      },
      Crucible: {
        add: () => {},
        remove: () => {}
      },
      Kiln: {
        add: () => {},
        remove: () => {},
        registerBlock: () => {}
      },
      Mill: {
        add: () => {},
        remove: () => {}
      },
      Movement: {
        set: () => {}
      },
      Saw: {
        add: () => {},
        remove: () => {}
      },
      StokedCauldron: {
        add: () => {},
        remove: () => {}
      },
      StokedCrucible: {
        add: () => {},
        remove: () => {}
      },
      Turntable: {
        add: () => {},
        remove: () => {}
      }
    },
    extrautils2: {
      Crusher: {
        add: () => {},
        remove: () => {}
      },
      Resonator: {
        add: () => {},
        remove: () => {}
      }
    },
    forestry: {
      Carpenter: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Centrifuge: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Fermenter: {
        addRecipe: () => {},
        removeRecipe: () => {},
        addFuel: () => {},
        removeFuel: () => {}
      },
      Moistener: {
        addRecipe: () => {},
        removeRecipe: () => {},
        addFuel: () => {},
        removeFuel: () => {}
      },
      Squeezer: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Still: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      ThermionicFabricator: {
        addSmelting: () => {},
        addCast: () => {},
        removeSmelting: () => {},
        removeCast: () => {}
      }
    },
    tconstruct: {
      Alloy: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Casting: {
        addTableRecipe: () => {},
        addBasinRecipe: () => {},
        removeTableRecipe: () => {},
        removeBasinRecipe: () => {}
      },
      Drying: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Fuel: {
        registerFuel: () => {}
      },
      Melting: {
        addRecipe: () => {},
        addEntityMelting: () => {},
        removeRecipe: () => {},
        removeEntityMelting: () => {}
      }
    },
    thermalexpansion: {
      Centrifuge: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Compactor: {
        addMintRecipe: () => {},
        addPressRecipe: () => {},
        addStorageRecipe: () => {},
        removeMintRecipe: () => {},
        removePressRecipe: () => {},
        removeStorageRecipe: () => {}
      },
      Crucible: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      InductionSmelter: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Infuser: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Insolator: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Pulverizer: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      RedstoneFurnace: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Refinery: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Sawmill: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Transposer: {
        addExtractRecipe: () => {},
        removeExtractRecipe: () => {},
        addFillRecipe: () => {},
        removeFillRecipe: () => {}
      }
    },
    nuclearcraft: {
      manufactory: {
        addRecipe: () => {},
        removeRecipe: () => {}
      }
    },
    pneumaticcraft: {
      assembly: {
        addDrillRecipe: () => {},
        addLaserRecipe: () => {},
        addDrillLaserRecipe: () => {},
        removeDrillRecipe: () => {},
        removeAllDrillRecipes: () => {},
        removeLaserRecipe: () => {},
        removeAllLaserRecipes: () => {},
        removeDrillLaserRecipe: () => {},
        removeAllDrillLaserRecipes: () => {},
        removeAllRecipes: () => {}
      },
      heatframecooling: {
        addRecipe: () => {},
        removeRecipe: () => {},
        removeAllRecipes: () => {}
      },
      pressurechamber: {
        addRecipe: () => {},
        removeRecipe: () => {},
        removeAllRecipes: () => {}
      },
      refinery: {
        addRecipe: () => {},
        removeRecipes: () => {},
        removeRecipe: () => {},
        removeAllRecipes: () => {}
      },
      thermopneumaticprocessingplant: {
        addRecipe: () => {},
        removeRecipe: () => {},
        removeAllRecipes: () => {}
      }
    },
    recipestages: {
      Recipes: {
        addShaped: () => {},
        addShapedMirrored: () => {},
        addShapeless: () => {},
        setRecipeStage: () => {}
      }
    },
    techreborn: {
      alloySmelter: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      assemblingMachine: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      blastFurnace: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      centrifuge: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      chemicalReactorRecipe: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      compressor: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      fusionReactor: {
        addRecipe: () => {},
        removeTopInputRecipe: () => {},
        removeBottomInputRecipe: () => {},
        removeRecipe: () => {}
      },
      implosionCompressor: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      industrialElectrolyzer: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      grinder: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      industrialSawmill: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      rollingMachine: {
        addShaped: () => {},
        addShapeless: () => {},
        removeRecipe: () => {}
      },
      scrapbox: {
        addScrapboxDrop: () => {}
      },
      vacuumFreezer: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      }
    },
    TinkerStages: {
      addGeneralCraftingStage: () => {},
      addGeneralPartReplacingStage: () => {},
      addGeneralPartBuildingStage: () => {},
      addGeneralModifierStage: () => {},
      addToolTypeStage: () => {},
      addMaterialStage: () => {},
      addModifierStage: () => {}
    },
    vctweaker: {
      addShaped: () => {},
      addShapedMirrored: () => {},
      addShapeless: () => {}
    },
    WailaStages: {
      addWailaStage: () => {},
      addRequirement: () => {}
    }
  },
  mod: {
    caravans: {
      Caravan: {
        addFollower: () => {},
        registerCaravan: () => {}
      }
    }
  },
  furnace: {
    remove: () => {},
    addRecipe: () => {},
    setFuel: () => {}
  },
  recipes: {
    addShaped: () => {},
    addShapedMirrored: () => {},
    addShapeless: () => {}
  }
}

export default class CTCTXMods extends Plugin {
  constructor() {
    super()
    this.name = "Modded CraftTweaker Context"
  }

  getContext() {
    return context
  }
}
