## Hotel management
Créer un API qui simule un un système de gestion d'hôtel:
CRUDS:
* chambres
* utilisateurs
* réservations

Il y a trois type d’utilisateurs :
* employé
* client
* admin

Un admin seulement peut `ajouter` ou `supprimer` des chambres

un `client` peut uniquement `créer` ou `annuler` une `réservation`



## Users

Un `utilisateur` répond à l’interface suivante:
```ts

interface User {
  nom : string
  prénom: string
  username: string //unique
  id : number
  role: 'admin' | 'employé' | 'client',
  password: string // lol
}
```


Seul un `admin` peut créer un `employé`

Seul un `employé` peut créer un `client`
Le rôle est utilisé dans la `session` pour vérifier qu’un `utilisateur` a le droit de faire une requête

## Chambres
Une `chambre` répond à l’interface suivante :
```ts
interface Chambre {
  numéro: number
  étage: number
  prix: number
}
```

Seul un `admin` peut `créer` ou `modifier` une `chambre`, mais tout le monde peut `checker` la liste des `chambres`

Une route `/chambres/:nb/available` doit permettre de savoir si la chambre est disponible

## Réservations
Une `réservation` doit répondre à l’interface suivante:
```ts
interface Reservation {
  id: number
  dateDebut: Date
  dateFin: Date
  prix: number
  cancelled : boolean (default = false)
  user: number // correspondant à l'ID de l’utilisateur ayant réservé
  chambre: number // numéro de la chambre louée
}
```
Un `client` ne peut interagir(voir, modifier, anuller) avec que ses reservations
Seul un `client` peut créer une `réservation`, ou l’annuler (pas en la supprimant, mais en mettant son champ `cancelled` a `true`
Lors de la création de la `réservation`, on doit vérifier que la chambre est disponible sur le créneau demandé.

Un `client` doit pouvoir estimer le prix que cela lui coûterait de réserver sur un créneau. Pour ça on fera une route `/reservations/estimate` qui renverra un prix sans créer de réservation.

Comme nous n’avons pas encore vu les bases de données, les entités seront stockées pour le moment dans des listes, dans la mémoire.

### bonus:
Votre hôtel est dans une station balnéaire. Gérer des prix fluctuants tels qu’ils sont diminués de 20% en période hivernale et augmentés de 20% en période estivale.

Bonne chance !