import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from './SearchBar.vue'

describe('SearchBar', () => {
  it('renders an input and button', () => {
    const wrapper = mount(SearchBar, { props: { placeholder: 'Search...' } })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('input uses placeholder prop', () => {
    const wrapper = mount(SearchBar, { props: { placeholder: 'Find manufacturers' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Find manufacturers')
  })

  it('emits search event on button click', async () => {
    const wrapper = mount(SearchBar, { props: { placeholder: '' } })
    await wrapper.find('input').setValue('electronics')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['electronics'])
  })

  it('emits search event on Enter key', async () => {
    const wrapper = mount(SearchBar, { props: { placeholder: '' } })
    await wrapper.find('input').setValue('textiles')
    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['textiles'])
  })
})
