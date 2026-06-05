import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ManufacturerCard from './ManufacturerCard.vue'

const manufacturer = {
  id: 1,
  name: 'Acme Corp',
  description: 'A leading manufacturer of widgets.',
  category: 'Electronics',
  location: 'Europe'
}

describe('ManufacturerCard', () => {
  it('renders manufacturer name', () => {
    const wrapper = mount(ManufacturerCard, { props: { manufacturer } })
    expect(wrapper.text()).toContain('Acme Corp')
  })

  it('renders manufacturer description', () => {
    const wrapper = mount(ManufacturerCard, { props: { manufacturer } })
    expect(wrapper.text()).toContain('A leading manufacturer')
  })

  it('renders category badge', () => {
    const wrapper = mount(ManufacturerCard, { props: { manufacturer } })
    expect(wrapper.text()).toContain('Electronics')
  })

  it('renders location badge', () => {
    const wrapper = mount(ManufacturerCard, { props: { manufacturer } })
    expect(wrapper.text()).toContain('Europe')
  })

  it('emits view-profile on click', async () => {
    const wrapper = mount(ManufacturerCard, { props: { manufacturer } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('view-profile')).toBeTruthy()
    expect(wrapper.emitted('view-profile')[0][0]).toEqual(manufacturer)
  })

  it('does not render category badge when category is null', () => {
    const m = { ...manufacturer, category: null }
    const wrapper = mount(ManufacturerCard, { props: { manufacturer: m } })
    expect(wrapper.text()).not.toContain('Electronics')
  })
})
