import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ThemeType } from '@/types/theme'
import ToggleThemeButton from '~/components/ui/ToggleThemeButton.vue'

const buttonSelector = '[data-testid=change-theme]'
const lightIconSelector = '.fa-solid.fa-sun'
const darkIconSelector = '.mdi-weather-night'
const themeChangeEmitter = 'theme-change'

describe('ToggleThemeButton', () => {
  it('After theme prop change, will change icon from sun to moon', async () => {
    expect(ToggleThemeButton).toBeTruthy()

    const wrapper = mount(ToggleThemeButton, {
      props: { theme: ThemeType.light } as any
    })
    expect(wrapper.find(lightIconSelector).exists()).toBeTruthy()
    await wrapper.setProps({ theme: ThemeType.dark })
    expect(wrapper.find(darkIconSelector).exists()).toBeTruthy()
  })

  it('Will invoke onThemeChange after click once', async () => {
    expect(ToggleThemeButton).toBeTruthy()

    const wrapper = mount(ToggleThemeButton, {
      props: { theme: ThemeType.light } as any
    })

    await wrapper.find(buttonSelector).trigger('click')
    expect(wrapper.emitted()[themeChangeEmitter].length).toBe(1)
    expect((wrapper.emitted()[themeChangeEmitter][0] as any)[0]).toBe(ThemeType.dark)
  })
})
