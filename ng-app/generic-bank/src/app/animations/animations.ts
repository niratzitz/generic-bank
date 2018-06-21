import {animate, group, query, stagger, style, transition, trigger} from "@angular/animations";

const ANIMATION_DURATION = '0.3s';
const ANIMATION_SHORT_DURATION = '0.2s';
const ANIMATION_TYPE = 'ease-in-out';

export const navigationOpacity = [trigger('navigationOpacity', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter', style({ opacity: '0'})
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ opacity: '0' }),
        animate(`${ANIMATION_DURATION} ${ANIMATION_TYPE}`, style({ opacity: '1'}))
      ], { optional: true }),
      query(':leave', [
        style({ opacity: '1' }),
        animate(`${ANIMATION_DURATION} ${ANIMATION_TYPE}`, style({ opacity: '0' }))
      ], { optional: true }),
    ])
  ])
])];

export const opacityTransition = [trigger('opacityTransition', [
  transition(':enter', [
    style({ opacity: '0',position: 'absolute', width: 'calc(100% - 30px)' }),
    animate(`${ANIMATION_SHORT_DURATION} ${ANIMATION_TYPE}`, style({ opacity: '1'}))
  ]),
  transition(':leave', [
    style({ opacity: '1',position: 'absolute', width: 'calc(100% - 30px)' }),
    animate(`${ANIMATION_SHORT_DURATION} ${ANIMATION_TYPE}`, style({ opacity: '0'}))
  ])
  // ])
])];

export const routerTransition = [trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'absolute'})
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate(`${ANIMATION_DURATION} ${ANIMATION_TYPE}`, style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate(`${ANIMATION_DURATION} ${ANIMATION_TYPE}`, style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ])
  ])
])];

export const expandTransition = [trigger('expandTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter .card', style({ opacity: 0 })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter .card', stagger(150, [
        style({ transform: 'translateY(-50%)' , opacity: 0}),
        animate(`${ANIMATION_SHORT_DURATION} ${ANIMATION_TYPE}`, style({ transform: 'translateY(0%)', opacity: 1 }))
      ]), { optional: true }),
      query(':leave .card', stagger(150, [
        style({ transform: 'translateY(0%)' , opacity: 1}),
        animate(`${ANIMATION_SHORT_DURATION} ${ANIMATION_TYPE}`, style({ transform: 'translateY(50%)', opacity: 0 }))
      ]), { optional: true }),
    ])
  ])
])];
