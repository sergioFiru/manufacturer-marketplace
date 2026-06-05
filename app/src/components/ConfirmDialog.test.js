import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmDialog from './ConfirmDialog.vue'

describe('ConfirmDialog', () => {
  it('is not visible when visible is false', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { message: 'Delete?', visible: false }
    })
    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('is visible when visible is true', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { message: 'Delete item?', visible: true }
    })
    expect(wrapper.find('.fixed').exists()).toBe(true)
  })

  it('shows the message', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { message: 'Are you sure?', visible: true }
    })
    expect(wrapper.text()).toContain('Are you sure?')
  })

  it('emits confirm on confirm button click', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: { message: 'Delete?', visible: true }
    })
    await wrapper.find('button.bg-blue-500').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('emits cancel on cancel button click', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: { message: 'Delete?', visible: true }
    })
    await wrapper.find('button.border').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})
