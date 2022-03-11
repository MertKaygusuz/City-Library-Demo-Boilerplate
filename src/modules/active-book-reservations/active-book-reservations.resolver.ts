import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActiveBookReservationsService } from './active-book-reservations.service';
import { ActiveBookReservation } from './entities/active-book-reservation.entity';
import { CreateActiveBookReservationInput } from './dto/create-active-book-reservation.input';
import { UpdateActiveBookReservationInput } from './dto/update-active-book-reservation.input';

//@Resolver(() => ActiveBookReservation)
export class ActiveBookReservationsResolver {
  constructor(
    private readonly activeBookReservationsService: ActiveBookReservationsService,
  ) {}

  //@Mutation(() => ActiveBookReservation)
  createActiveBookReservation(
    @Args('createActiveBookReservationInput')
    createActiveBookReservationInput: CreateActiveBookReservationInput,
  ) {
    return this.activeBookReservationsService.create(
      createActiveBookReservationInput,
    );
  }

  //@Query(() => [ActiveBookReservation], { name: 'activeBookReservations' })
  findAll() {
    return this.activeBookReservationsService.findAll();
  }

  //@Query(() => ActiveBookReservation, { name: 'activeBookReservation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.activeBookReservationsService.findOne(id);
  }

  //@Mutation(() => ActiveBookReservation)
  updateActiveBookReservation(
    @Args('updateActiveBookReservationInput')
    updateActiveBookReservationInput: UpdateActiveBookReservationInput,
  ) {
    return this.activeBookReservationsService.update(
      updateActiveBookReservationInput.id,
      updateActiveBookReservationInput,
    );
  }

  //@Mutation(() => ActiveBookReservation)
  removeActiveBookReservation(@Args('id', { type: () => Int }) id: number) {
    return this.activeBookReservationsService.remove(id);
  }
}
