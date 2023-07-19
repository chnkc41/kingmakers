import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// import Spinner from '../spinner'
import { CONTROL_SIZES, SIZES } from 'constants/constant'

const Button = ({ children, disabled, loading, icon, size, shape, block, className, onClick }) => {
  const defaultClass = 'btn '
  const sizeIconClass = 'inline-flex items-center justify-center'
  const buttonSize = size

  const getButtonSize = () => {
    let sizeClass = ''
    switch (buttonSize) {
      case SIZES.XL:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.xl}`,
          icon && !children
            ? `w-${CONTROL_SIZES.xl} ${sizeIconClass} text-4xl`
            : 'px-8 py-2 text-xl',
        )
        break
      case SIZES.LG:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.lg}`,
          icon && !children
            ? `w-${CONTROL_SIZES.lg} ${sizeIconClass} text-2xl`
            : 'px-8 py-2 text-lg',
        )
        break
      case SIZES.SM:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.sm}`,
          icon && !children
            ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg`
            : 'px-2.5 py-2 text-sm',
        )
        break
      case SIZES.XS:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.xs}`,
          icon && !children
            ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base`
            : 'px-3 py-1 text-xs',
        )
        break
      default:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.md}`,
          icon && !children ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl` : 'text-base px-8 py-2',
        )
        break
    }
    return sizeClass
  }

  const classes = classNames(defaultClass, shape, getButtonSize(), className, block ? 'w-full' : '')

  const handleClick = (e) => {
    // const { onClick } = props
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  const renderChildren = () => {
    if (loading && children) {
      return (
        <span className="flex items-center justify-center">
          {/* <Spinner enableTheme={false} className="mr-1" /> */}
          {children}
        </span>
      )
    }

    // if (icon && !children && loading) {
    //   return <Spinner enableTheme={false} />
    // }

    if (icon && !children && !loading) {
      return <>{icon}</>
    }

    if (icon && children && !loading) {
      return (
        <span className="flex items-center justify-center">
          <span className="text-lg">{icon}</span>
          <span className="ltr:ml-1 rtl:mr-1">{children}</span>
        </span>
      )
    }

    return <>{children}</>
  }

  return (
    <button className={classes} onClick={handleClick}>
      {renderChildren()}
    </button>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  block: PropTypes.bool,
  shape: PropTypes.oneOf(['round', 'circle', 'none']),
  className: PropTypes.string,
  size: PropTypes.oneOf([SIZES.XL, SIZES.LG, SIZES.SM, SIZES.XS, SIZES.MD]),
  color: PropTypes.string,
  variant: PropTypes.oneOf(['solid', 'twoTone', 'plain', 'default']),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  active: PropTypes.bool,
}

Button.defaultProps = {
  variant: 'default',
  shape: 'round',
  active: false,
  loading: false,
  disabled: false,
  color: '',
}

export default Button
