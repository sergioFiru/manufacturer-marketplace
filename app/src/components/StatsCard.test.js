import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatsCard from './StatsCard.vue'

describe('StatsCard', () => {
  it('renders the title', () => {
    const wrapper = mount(StatsCard, {
      props: { title: 'Total Manufacturers', value: 42 }
    })
    expect(wrapper.text()).toContain('Total Manufacturers')
  })

  it('renders the value', () => {
    const wrapper = mount(StatsCard, {
      props: { title: 'Active Products', value: 7 }
    })
    expect(wrapper.text()).toContain('7')
  })

  it('renders zero value', () => {
    const wrapper = mount(StatsCard, {
      props: { title: 'Users', value: 0 }
    })
    expect(wrapper.text()).toContain('0')
  })
})
