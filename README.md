from abc import ABC, abstractmethod

class Item:
    def __init__(self, name):
        self.name = name

class Weapon(Item):
    pass

class Armor(Item):
    pass

class Potion(Item):
    pass

class Material(Item):
    pass

class Inventory(ABC):
    def __init__(self):
        self.items = [] 

    def __len__(self):
        return len(self.items)

    def contains(self, item):
        return item in self.items  

    def add(self, item):
        self.items.append(item)  

    @abstractmethod
    def give_item(self, item):
        pass

class MyInventory(Inventory):
    def __init__(self):
        super().__init__()
        self.weapon = [Weapon("Меч"), Weapon("Топор"), Weapon("Лук")]
        self.armor = [Armor("Шлем"), Armor("Нагрудник"), Armor("Ботинки")]
        self.potion = [Potion("Зелье Регенерации"), Potion("Зелье Маны"), Potion("Зелье Выносливости")]
        self.materials = [Material("Железный Слиток"), Material("Кожа"), Material("Магическая Эссенция")]

    def give_item(self, item):
        if item in self.items:
            self.items.remove(item)
            return f"Предмет {item.name} получен из инвентаря."
        return f"Предмет {item.name} отсутствует в инвентаре."

class User:
    def __init__(self, name):
        self.name = name
        self.equipped_weapon = None
        self.equipped_armor = None
        self.equipped_potion = None
        self.equipped_material = None

    def equip_weapon(self, weapon):
        self.equipped_weapon = weapon

    def equip_armor(self, armor):
        self.equipped_armor = armor

    def equip_potion(self, potion):
        self.equipped_potion = potion

    def equip_material(self, material):
        self.equipped_material = material

    def display_equipped_items(self):
        print(f"{self.name} использует следующие предметы:")
        if self.equipped_weapon:
            print("Оружие:", self.equipped_weapon.name)
        if self.equipped_armor:
            print("Броня:", self.equipped_armor.name)
        if self.equipped_potion:
            print("Зелье:", self.equipped_potion.name)
        if self.equipped_material:
            print("Материал:", self.equipped_material.name)

# Создание инвентаря игрока
my_inventory = MyInventory()

# Создание игрока
player = User("Игрок")

# Назначение предметов игроку
player.equip_weapon(my_inventory.weapon[0])
player.equip_armor(my_inventory.armor[0])
player.equip_potion(my_inventory.potion[0])
player.equip_material(my_inventory.materials[0])

# Отображение используемых предметов игрока
player.display_equipped_items()
